import os, subprocess, json, sys, urllib.request, time
ACCOUNTS = ["", "codex-mfs-automation@success-ai-dbdf7.iam.gserviceaccount.com", "kaya@successai.app"]
def key():
    k = os.environ.get("OPENAI_API_KEY", "").strip()
    if k: return k
    for a in ACCOUNTS:
        cmd = ["gcloud","secrets","versions","access","latest","--secret=OPENAI_API_KEY","--project=success-ai-dbdf7"]
        if a: cmd.append(f"--account={a}")
        try:
            return subprocess.check_output(cmd, text=True, stderr=subprocess.DEVNULL).strip()
        except subprocess.CalledProcessError:
            continue
    raise SystemExit("no key available")
def req(method, path, body=None, raw=False):
    headers = {"Authorization": f"Bearer {key()}"}
    data = None
    if body is not None:
        data = json.dumps(body).encode(); headers["Content-Type"] = "application/json"
    r = urllib.request.Request("https://api.openai.com/v1"+path, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(r, timeout=300) as resp:
            return resp.read() if raw else json.loads(resp.read())
    except urllib.error.HTTPError as e:
        raise SystemExit(f"HTTP {e.code}: {e.read()[:400]}")
if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "models":
        ms = req("GET", "/models")["data"]
        print(sorted(m["id"] for m in ms if "sora" in m["id"] or "video" in m["id"]))
    elif cmd == "create":
        model, seconds, size, prompt = sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]
        out = req("POST", "/videos", {"model": model, "prompt": prompt, "seconds": seconds, "size": size})
        print(json.dumps({k: out.get(k) for k in ("id","status","model","seconds","size","progress")}))
    elif cmd == "create-ref":
        # multipart: model, prompt, seconds, size, input_reference (image file)
        import mimetypes, uuid
        model, seconds, size, ref, prompt = sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6]
        boundary = "----kh" + uuid.uuid4().hex
        parts = []
        for name, val in (("model", model), ("prompt", prompt), ("seconds", seconds), ("size", size)):
            parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"\r\n\r\n{val}\r\n".encode())
        ctype = mimetypes.guess_type(ref)[0] or "image/png"
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"input_reference\"; filename=\"{os.path.basename(ref)}\"\r\nContent-Type: {ctype}\r\n\r\n".encode() + open(ref, "rb").read() + b"\r\n")
        parts.append(f"--{boundary}--\r\n".encode())
        body = b"".join(parts)
        r = urllib.request.Request("https://api.openai.com/v1/videos", data=body, method="POST", headers={"Authorization": f"Bearer {key()}", "Content-Type": f"multipart/form-data; boundary={boundary}"})
        try:
            with urllib.request.urlopen(r, timeout=300) as resp:
                out = json.loads(resp.read())
        except urllib.error.HTTPError as e:
            raise SystemExit(f"HTTP {e.code}: {e.read()[:400]}")
        print(json.dumps({k: out.get(k) for k in ("id","status","model","seconds","size")}))
    elif cmd == "wait":
        vid = sys.argv[2]
        while True:
            out = req("GET", f"/videos/{vid}")
            st = out.get("status")
            print(json.dumps({"id": vid, "status": st, "progress": out.get("progress"), "error": out.get("error")}), flush=True)
            if st in ("completed", "failed", "cancelled"): break
            time.sleep(20)
    elif cmd == "download":
        data = req("GET", f"/videos/{sys.argv[2]}/content", raw=True)
        open(sys.argv[3], "wb").write(data); print("saved", sys.argv[3], len(data))
