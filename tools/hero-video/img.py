import sys, json, base64, urllib.request
sys.path.insert(0, '.')
from oa import key
prompt = sys.argv[1]; out = sys.argv[2]
body = json.dumps({"model": "gpt-image-1", "prompt": prompt, "size": "1536x1024", "quality": "high", "n": 1}).encode()
r = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body, method="POST", headers={"Authorization": f"Bearer {key()}", "Content-Type": "application/json"})
with urllib.request.urlopen(r, timeout=600) as resp:
    d = json.loads(resp.read())
open(out, "wb").write(base64.b64decode(d["data"][0]["b64_json"])); print("saved", out)
