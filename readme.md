# iFrame <> Host Communication

Establishing communication between iframe and host project via postMessage API in react project.

"**host-project**" can be any project inside which our iframe is being used. "_iframe-project_" contains our iframe.

Install & run individual projects separately to test the setup. Update necessary urls.

Remember:
- Update the allowed hosts inside the iframe project.
- Update the iframe domain url inside the host projects as needed.


To test without updating urls:

```
- Run iframe on port 5173, and host project on 5174 (i.e http://localhost:5174)
- host-project-2 on http://127.0.0.1:5500
```

