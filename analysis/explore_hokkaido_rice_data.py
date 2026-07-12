from __future__ import annotations

import json
from pathlib import Path
import requests
import pandas as pd

OUT = Path("analysis/output_explore")
OUT.mkdir(parents=True, exist_ok=True)


def fetch(url: str, name: str) -> bytes:
    r = requests.get(url, timeout=120, headers={"User-Agent": "Mozilla/5.0"})
    meta = {
        "url": url,
        "status_code": r.status_code,
        "content_type": r.headers.get("content-type"),
        "content_disposition": r.headers.get("content-disposition"),
        "length": len(r.content),
        "final_url": r.url,
    }
    (OUT / f"{name}_meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    r.raise_for_status()
    (OUT / f"{name}.bin").write_bytes(r.content)
    return r.content


# Official e-Stat download referenced from the statistical table page.
estat_url = "https://www.e-stat.go.jp/stat-search/file-download?fileKind=0&statInfId=000040433904"
try:
    content = fetch(estat_url, "estat")
    # Try common spreadsheet formats.
    for ext in ["xlsx", "xls", "csv"]:
        p = OUT / f"estat.{ext}"
        p.write_bytes(content)
        try:
            if ext in {"xlsx", "xls"}:
                xls = pd.ExcelFile(p)
                summary = {"sheets": xls.sheet_names}
                (OUT / "estat_sheets.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
                chunks = []
                for sheet in xls.sheet_names[:10]:
                    df = pd.read_excel(p, sheet_name=sheet, header=None, nrows=60)
                    chunks.append(f"\n### SHEET: {sheet}\n" + df.to_csv(index=False, header=False))
                (OUT / "estat_preview.txt").write_text("\n".join(chunks), encoding="utf-8")
                break
            else:
                text = content.decode("utf-8-sig")
                (OUT / "estat_preview.txt").write_text(text[:20000], encoding="utf-8")
                break
        except Exception as e:
            (OUT / f"estat_{ext}_error.txt").write_text(repr(e), encoding="utf-8")
except Exception as e:
    (OUT / "estat_fetch_error.txt").write_text(repr(e), encoding="utf-8")


# ORNL DAAC MODIS subset API: representative paddy area in Bibai, Sorachi.
modis_url = (
    "https://modis.ornl.gov/rst/api/v1/MOD13A2/subset"
    "?latitude=43.309&longitude=141.856"
    "&startDate=A2024177&endDate=A2024241"
    "&kmAboveBelow=1&kmLeftRight=1"
)
try:
    content = fetch(modis_url, "modis")
    try:
        obj = json.loads(content)
        (OUT / "modis_pretty.json").write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")
    except Exception as e:
        (OUT / "modis_json_error.txt").write_text(repr(e) + "\n" + content[:5000].decode("utf-8", errors="replace"), encoding="utf-8")
except Exception as e:
    (OUT / "modis_fetch_error.txt").write_text(repr(e), encoding="utf-8")

print("Exploration complete")
