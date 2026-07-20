window.SEED_VERSION = "backend-interview-final-v1";
window.SEED_CARDS = [
  {
    "id": "backend-final-001",
    "topic": "BACKEND INTERVIEW · SQL Joins + Indexes",
    "question": "What's the difference between an INNER JOIN and a LEFT JOIN, and when would using the wrong one silently break your data?",
    "options": [],
    "correctOption": "",
    "answer": "INNER JOIN only returns rows where both tables have a match. LEFT JOIN keeps every row from the left table even if there's no match (fills the right side with NULLs). Silent breakage example: you JOIN users with orders using INNER JOIN to build a \"user activity\" report — users with zero orders just vanish from the report instead of showing up as \"0 orders.\" Nobody notices because there's no error, just missing rows."
  },
  {
    "id": "backend-final-002",
    "topic": "BACKEND INTERVIEW · SQL Joins + Indexes",
    "question": "How does a B-tree index actually make a query faster, and why doesn't adding an index everywhere help?",
    "options": [],
    "correctOption": "",
    "answer": "A B-tree index is a sorted structure that lets the database jump to the right rows in O(log n) instead of scanning every row (O(n)). It helps when you filter/sort/join on that column. It doesn't help everywhere because: (1) every index adds write overhead — every INSERT/UPDATE now has to update the index too, (2) if the column has low cardinality (like a boolean), the index barely narrows anything down, and the planner may skip it anyway, (3) indexes take disk space and memory."
  },
  {
    "id": "backend-final-003",
    "topic": "BACKEND INTERVIEW · SQL Joins + Indexes",
    "question": "You add an index but the query is still slow. What are 2-3 reasons that could happen?",
    "options": [],
    "correctOption": "",
    "answer": "(1) The query uses a function on the indexed column (WHERE LOWER(email) = ...) — this breaks the index unless you have a functional index. (2) The planner decided a full table scan is actually cheaper (common on small tables, or when the WHERE clause matches most of the rows anyway). (3) You indexed the wrong column combination — e.g., you have separate indexes on user_id and status, but your query filters on both together; a composite index (user_id, status) would be better."
  },
  {
    "id": "backend-final-004",
    "topic": "BACKEND INTERVIEW · N+1 Query Problem",
    "question": "What exactly is the N+1 problem, and why does it get worse in production but often looks fine in dev?",
    "options": [],
    "correctOption": "",
    "answer": "You run 1 query to get N parent rows (e.g., 50 users), then for each one you run a separate query to get related data (their orders) — that's 1 + N = 51 queries instead of 2. It looks fine in dev because your test data might have 5 users. In production with 10,000 users, that's 10,001 queries, and each round-trip to the DB has network latency — it compounds fast."
  },
  {
    "id": "backend-final-005",
    "topic": "BACKEND INTERVIEW · N+1 Query Problem",
    "question": "In SQLAlchemy, what's the actual difference between joinedload and selectinload, and when would you pick one over the other?",
    "options": [],
    "correctOption": "",
    "answer": "joinedload does a single query with a SQL JOIN — good for one-to-one or small one-to-many relationships, but if the \"many\" side is large, you get row duplication (parent data repeated for every child row), which bloats the result set. selectinload does 2 queries total: one for parents, one WHERE id IN (...) for all children at once — better for one-to-many with many children, since there's no duplication."
  },
  {
    "id": "backend-final-006",
    "topic": "BACKEND INTERVIEW · N+1 Query Problem",
    "question": "How would you actually detect an N+1 problem in a real project, not just spot it by reading code?",
    "options": [],
    "correctOption": "",
    "answer": "Turn on SQLAlchemy's query logging (echo=True) or use a tool that counts queries per request (like nplusone or just logging count in middleware) and watch for query count spiking with the number of returned items. In practice: hit an endpoint that returns a list, and if query count scales linearly with list length, that's your signal."
  },
  {
    "id": "backend-final-007",
    "topic": "BACKEND INTERVIEW · JWT (JSON Web Tokens)",
    "question": "What are the three parts of a JWT and what's actually inside each one?",
    "options": [],
    "correctOption": "",
    "answer": "Header (algorithm + token type, e.g. HS256), Payload (claims — user id, expiry, roles, etc.), Signature (header + payload signed with a secret/key). Important: header and payload are just Base64-encoded, NOT encrypted — anyone can read them. Only the signature proves it wasn't tampered with."
  },
  {
    "id": "backend-final-008",
    "topic": "BACKEND INTERVIEW · JWT (JSON Web Tokens)",
    "question": "If the payload isn't encrypted, why is a JWT still considered secure?",
    "options": [],
    "correctOption": "",
    "answer": "Because the security guarantee isn't confidentiality, it's integrity — you can't fake or modify a valid token without knowing the server's secret key, since the signature won't match. That's why you should never put sensitive data (passwords, card numbers) directly in a JWT payload — anyone can decode and read it, they just can't forge it."
  },
  {
    "id": "backend-final-009",
    "topic": "BACKEND INTERVIEW · JWT (JSON Web Tokens)",
    "question": "Access token got stolen and used from another device. Walk through what happens and how you'd limit the damage.",
    "options": [],
    "correctOption": "",
    "answer": "If it's a stateless JWT, the server can't \"revoke\" it — it stays valid until it expires. That's why access tokens should have a short lifespan (5-15 min). Damage is naturally limited by that expiry. For actual revocation ability, you need refresh tokens stored server-side (in a DB or Redis) — you can invalidate a specific refresh token, which then blocks the user from getting new access tokens, effectively locking out the stolen session within minutes."
  },
  {
    "id": "backend-final-010",
    "topic": "BACKEND INTERVIEW · Refresh Tokens",
    "question": "Why do we need both an access token and a refresh token instead of just one long-lived token?",
    "options": [],
    "correctOption": "",
    "answer": "Access token = short-lived, sent on every request, high exposure risk (network, logs, browser). Refresh token = long-lived, sent rarely (only to get a new access token), lower exposure. Splitting them means even if an access token leaks, the damage window is small; the refresh token is used less often and can be stored more securely (httpOnly cookie)."
  },
  {
    "id": "backend-final-011",
    "topic": "BACKEND INTERVIEW · Refresh Tokens",
    "question": "What is refresh token rotation, and what problem does it solve?",
    "options": [],
    "correctOption": "",
    "answer": "Every time a refresh token is used to get a new access token, the server issues a new refresh token and invalidates the old one. This solves token replay: if an attacker steals a refresh token and uses it, and then the real user also tries to use their (now invalidated) old token, the server can detect that mismatch and immediately revoke the whole token family — signaling a theft."
  },
  {
    "id": "backend-final-012",
    "topic": "BACKEND INTERVIEW · Refresh Tokens",
    "question": "Where should the refresh token be stored on the frontend, and why not localStorage?",
    "options": [],
    "correctOption": "",
    "answer": "httpOnly cookie, ideally with Secure and SameSite flags. localStorage is accessible via JavaScript, which means any XSS vulnerability on the site lets an attacker read the token directly. httpOnly cookies can't be accessed by JS at all, so an XSS attack can't steal them (though CSRF becomes the new concern, which SameSite helps mitigate)."
  },
  {
    "id": "backend-final-013",
    "topic": "BACKEND INTERVIEW · HashMap Internals",
    "question": "How does a HashMap achieve average O(1) lookup?",
    "options": [],
    "correctOption": "",
    "answer": "It uses a hash function to convert the key into an index in an underlying array (bucket). Instead of searching through elements one by one, it jumps directly to the bucket where the value should be. Average case is O(1) if the hash function distributes keys evenly across buckets."
  },
  {
    "id": "backend-final-014",
    "topic": "BACKEND INTERVIEW · HashMap Internals",
    "question": "What is a hash collision, and what happens when two different keys hash to the same bucket?",
    "options": [],
    "correctOption": "",
    "answer": "A collision is when two different keys produce the same bucket index. Most implementations handle it with chaining (each bucket holds a small list/tree of entries) or open addressing (probe for the next free slot). With chaining, if collisions are rare, lookup stays close to O(1); if the hash function is bad and everything collides into one bucket, lookup degrades to O(n) — you've basically built a linked list."
  },
  {
    "id": "backend-final-015",
    "topic": "BACKEND INTERVIEW · HashMap Internals",
    "question": "You override hashCode() (or __hash__ in Python) incorrectly — say it always returns 1. What breaks, step by step?",
    "options": [],
    "correctOption": "",
    "answer": "Every key now hashes to the same bucket. The HashMap can no longer distinguish keys by position — it has to linearly scan the one overloaded bucket for every single lookup/insert. Lookup/insert complexity goes from O(1) average to O(n) worst case. In practice: CPU usage climbs because every operation scans more, latency per request increases, and overall throughput of the service drops — a HashMap silently becomes a linked list under load."
  },
  {
    "id": "backend-final-016",
    "topic": "BACKEND INTERVIEW · Transactions / ACID",
    "question": "What does each letter in ACID actually guarantee, in plain terms?",
    "options": [],
    "correctOption": "",
    "answer": "Atomicity — all operations in a transaction succeed or none do (no half-finished writes). Consistency — the DB moves from one valid state to another (constraints/rules always hold). Isolation — concurrent transactions don't see each other's uncommitted changes. Durability — once committed, data survives even a crash right after."
  },
  {
    "id": "backend-final-017",
    "topic": "BACKEND INTERVIEW · Transactions / ACID",
    "question": "Give a concrete example of what breaks without atomicity.",
    "options": [],
    "correctOption": "",
    "answer": "Bank transfer: subtract $100 from account A, add $100 to account B. If the server crashes after step 1 but before step 2 — without atomicity, $100 just vanished. With a transaction, either both steps happen or neither does; on crash, the DB rolls back to before the transfer started."
  },
  {
    "id": "backend-final-018",
    "topic": "BACKEND INTERVIEW · Transactions / ACID",
    "question": "What's an isolation level, and can you name one problem that a low isolation level allows?",
    "options": [],
    "correctOption": "",
    "answer": "Isolation level controls how much one transaction can \"see\" of another transaction's in-progress changes. At READ UNCOMMITTED, you can get a \"dirty read\" — you read data another transaction wrote but hasn't committed yet, and if that transaction then rolls back, you've acted on data that never actually existed. Higher levels (READ COMMITTED, REPEATABLE READ, SERIALIZABLE) prevent more of these anomalies but cost more performance due to increased locking/blocking."
  },
  {
    "id": "backend-final-019",
    "topic": "BACKEND INTERVIEW · REST API Design",
    "question": "What's the difference between PUT and PATCH, and why does it matter for how you design an update endpoint?",
    "options": [],
    "correctOption": "",
    "answer": "PUT replaces the entire resource — if you omit a field, it's expected to be cleared/reset. PATCH applies a partial update — only the fields you send get changed. If your frontend sends {\"name\": \"Rakhat\"} via PUT to update just a name, and the resource also has an email field, PUT semantics say email should be wiped unless you also send it. That's a common bug source — using PUT like PATCH."
  },
  {
    "id": "backend-final-020",
    "topic": "BACKEND INTERVIEW · REST API Design",
    "question": "What does \"idempotent\" mean, and which HTTP methods are supposed to be idempotent?",
    "options": [],
    "correctOption": "",
    "answer": "Idempotent means calling it once or calling it 10 times has the same effect as calling it once. GET, PUT, DELETE are supposed to be idempotent — deleting the same resource twice still results in \"it's gone,\" same as deleting once. POST is NOT idempotent by default — calling it twice typically creates two resources (e.g., double-charging, duplicate orders), which is why retries on POST are dangerous without an idempotency key."
  },
  {
    "id": "backend-final-021",
    "topic": "BACKEND INTERVIEW · REST API Design",
    "question": "How would you design pagination for an endpoint returning 100,000 rows, and what's the problem with plain OFFSET/LIMIT at scale?",
    "options": [],
    "correctOption": "",
    "answer": "OFFSET/LIMIT (OFFSET 50000 LIMIT 20) forces the DB to scan and discard the first 50,000 rows every time — it gets slower the deeper you paginate. Cursor-based pagination (WHERE id > last_seen_id LIMIT 20) uses an index to jump straight to the right spot regardless of how deep you are — consistent performance, and it's also more stable if rows are being inserted/deleted while paginating."
  },
  {
    "id": "backend-final-022",
    "topic": "BACKEND INTERVIEW · Caching (Redis)",
    "question": "What problem does caching actually solve, and what's the tradeoff you're accepting?",
    "options": [],
    "correctOption": "",
    "answer": "It reduces load on your database/backend and cuts response latency by serving frequently-requested data from fast in-memory storage instead of recomputing/re-querying it. The tradeoff: you now have two sources of truth (DB and cache), and they can drift out of sync — this is the \"cache invalidation\" problem, famously one of the two hard problems in computer science."
  },
  {
    "id": "backend-final-023",
    "topic": "BACKEND INTERVIEW · Caching (Redis)",
    "question": "What's cache invalidation, and describe one strategy for handling it.",
    "options": [],
    "correctOption": "",
    "answer": "It's the problem of knowing when cached data is stale and needs to be refreshed or removed. One common strategy: TTL (time-to-live) — cache expires automatically after N seconds, accepting some staleness in exchange for simplicity. A stricter strategy: write-through invalidation — whenever the underlying data changes, you explicitly delete/update the cache entry in the same operation, so it's never stale (but adds complexity and coupling)."
  },
  {
    "id": "backend-final-024",
    "topic": "BACKEND INTERVIEW · Caching (Redis)",
    "question": "When does caching actually make things worse instead of better?",
    "options": [],
    "correctOption": "",
    "answer": "When data changes very frequently relative to how often it's read (you spend more effort invalidating than you save on reads), when the cache key space is huge and mostly unique (low hit rate — you're just adding a lookup layer that rarely helps), or under \"cache stampede\" — many requests miss the cache at the same moment (e.g., right after expiry) and all hit the DB simultaneously, spiking load worse than if there were no cache at all."
  },
  {
    "id": "backend-final-025",
    "topic": "BACKEND INTERVIEW · Async/Await in Python",
    "question": "What actually happens when you await something in Python — does it use another thread?",
    "options": [],
    "correctOption": "",
    "answer": "No, by default it's single-threaded. await yields control back to the event loop, which can then run other coroutines while the awaited operation (like a network call or DB query) is in progress. It's cooperative multitasking, not parallelism — only one piece of Python code is executing at any instant."
  },
  {
    "id": "backend-final-026",
    "topic": "BACKEND INTERVIEW · Async/Await in Python",
    "question": "Given Python has a GIL, why does async/await help performance at all?",
    "options": [],
    "correctOption": "",
    "answer": "The GIL prevents true parallel CPU execution across threads, but it doesn't block I/O waiting. Async shines specifically for I/O-bound work — waiting on a database, an external API, a file read. While one coroutine is waiting on I/O, the event loop runs other coroutines instead of sitting idle. For CPU-bound work (heavy computation), async gives you no benefit — you'd need multiprocessing instead."
  },
  {
    "id": "backend-final-027",
    "topic": "BACKEND INTERVIEW · Async/Await in Python",
    "question": "You call a synchronous, blocking function (like a non-async DB driver call) inside an async def endpoint. What breaks?",
    "options": [],
    "correctOption": "",
    "answer": "That blocking call freezes the entire event loop — no other coroutine can run until it finishes, even though your endpoint LOOKS async. In FastAPI this is a classic mistake: mixing sync-blocking libraries into async routes silently kills the concurrency benefit you thought you had. Fix: use an async-native driver, or run the blocking call in a thread pool (run_in_executor)."
  },
  {
    "id": "backend-final-028",
    "topic": "BACKEND INTERVIEW · Docker Basics",
    "question": "What's the actual difference between an image and a container?",
    "options": [],
    "correctOption": "",
    "answer": "An image is a read-only template/blueprint — your app code, dependencies, and OS layers baked together. A container is a running instance of that image — like a class vs. an object. You can spin up multiple containers from the same image, each isolated from the others."
  },
  {
    "id": "backend-final-029",
    "topic": "BACKEND INTERVIEW · Docker Basics",
    "question": "Why does layer order in a Dockerfile matter for build speed?",
    "options": [],
    "correctOption": "",
    "answer": "Docker caches each layer, and if a layer hasn't changed, it reuses the cache instead of rebuilding. If you COPY your entire app code before running pip install, then every code change invalidates the cache for the install step too — so every build reinstalls all dependencies. Correct order: copy requirements.txt and install dependencies first, then copy the rest of the code — dependency installs stay cached as long as requirements.txt doesn't change."
  },
  {
    "id": "backend-final-030",
    "topic": "BACKEND INTERVIEW · Docker Basics",
    "question": "In docker-compose, why can your FastAPI container reach your Postgres container using just the service name (e.g., postgres://db:5432) instead of an IP?",
    "options": [],
    "correctOption": "",
    "answer": "docker-compose creates a private network for the services defined in the same file, and Docker's built-in DNS resolves each service name to its container's internal IP automatically. So db isn't a hostname you configured manually — it's the service name from docker-compose.yml, resolved via Docker's internal DNS."
  },
  {
    "id": "backend-final-031",
    "topic": "BACKEND INTERVIEW · Rate Limiting",
    "question": "Why does an API need rate limiting at all — what's the actual risk without it?",
    "options": [],
    "correctOption": "",
    "answer": "Without limits, one client (malicious or just buggy — a retry loop gone wrong) can hammer your API with requests, exhausting your server's resources (CPU, DB connections, memory) and degrading or crashing the service for everyone else. It's also your main defense against brute-force attacks (e.g., someone guessing passwords via your login endpoint)."
  },
  {
    "id": "backend-final-032",
    "topic": "BACKEND INTERVIEW · Rate Limiting",
    "question": "Explain the token bucket algorithm in plain terms.",
    "options": [],
    "correctOption": "",
    "answer": "Imagine a bucket that holds up to N tokens, refilling at a fixed rate (e.g., 1 token/second). Every request consumes 1 token. If the bucket's empty, the request is rejected/delayed. This allows short bursts (up to bucket size) while still enforcing a steady average rate over time — more flexible than a strict \"max 10 requests per second\" hard cutoff."
  },
  {
    "id": "backend-final-033",
    "topic": "BACKEND INTERVIEW · Rate Limiting",
    "question": "Where would you actually implement rate limiting — in your app code, or somewhere else — and why?",
    "options": [],
    "correctOption": "",
    "answer": "Ideally at the edge (reverse proxy like Nginx, or an API gateway) before it even hits your application — cheaper to reject early, protects your app servers directly. For per-user limits based on business logic (like \"free tier users get 100 requests/day\"), you often need it in application code backed by Redis (fast counters with TTL), since that requires knowing who the authenticated user is."
  },
  {
    "id": "backend-final-034",
    "topic": "BACKEND INTERVIEW · Connection Pooling",
    "question": "What's the problem with opening a new DB connection for every single request?",
    "options": [],
    "correctOption": "",
    "answer": "Opening a connection involves a TCP handshake, authentication, and session setup on the DB side — this takes real time (milliseconds that add up) and consumes DB-side resources. Under load, you can literally run out of available connections on the database server, since each DB has a hard connection limit."
  },
  {
    "id": "backend-final-035",
    "topic": "BACKEND INTERVIEW · Connection Pooling",
    "question": "How does a connection pool solve this?",
    "options": [],
    "correctOption": "",
    "answer": "It pre-opens a set of connections at app startup and reuses them across requests — a request \"borrows\" a connection, uses it, and returns it to the pool instead of closing it. This avoids the setup/teardown cost per request and keeps the number of concurrent DB connections bounded and predictable."
  },
  {
    "id": "backend-final-036",
    "topic": "BACKEND INTERVIEW · Connection Pooling",
    "question": "Your pool size is 10, but you suddenly get 50 concurrent requests. What happens, and how do you tune for it?",
    "options": [],
    "correctOption": "",
    "answer": "The other 40 requests queue up waiting for a connection to free up — response times spike, and if the wait exceeds a timeout, requests start failing outright. Tuning means balancing pool size against your DB's max connection limit (don't just crank pool size up — the DB itself has a ceiling) and considering whether you actually need that much concurrency, or whether some requests should be queued/rate-limited instead."
  },
  {
    "id": "backend-final-037",
    "topic": "BACKEND INTERVIEW · Load Balancing",
    "question": "What's the difference between round robin and least connections load balancing?",
    "options": [],
    "correctOption": "",
    "answer": "Round robin sends requests to servers in a fixed rotating order, regardless of current load — simple, but can overload a server that's already busy with slow requests. Least connections sends the next request to whichever server currently has the fewest active connections — adapts better when requests take variable time to process."
  },
  {
    "id": "backend-final-038",
    "topic": "BACKEND INTERVIEW · Load Balancing",
    "question": "What's a \"sticky session,\" and what problem does it introduce?",
    "options": [],
    "correctOption": "",
    "answer": "It means a load balancer routes all requests from the same user to the same backend server (often via a cookie), usually because that server holds some session state in memory. The problem: it breaks the ability to freely scale/replace servers — if that specific server goes down, that user's session data is gone, and it makes horizontal scaling less clean since load isn't evenly distributed by design."
  },
  {
    "id": "backend-final-039",
    "topic": "BACKEND INTERVIEW · Load Balancing",
    "question": "How would you avoid needing sticky sessions in the first place?",
    "options": [],
    "correctOption": "",
    "answer": "Make your backend servers stateless — store session data somewhere shared and external (Redis, a DB) rather than in each server's local memory. Then any server can handle any request from any user, since the state isn't tied to a specific machine. This is the core idea behind horizontally scalable backend design."
  },
  {
    "id": "backend-final-040",
    "topic": "BACKEND INTERVIEW · Horizontal vs Vertical Scaling",
    "question": "What's the actual difference, in one sentence each?",
    "options": [],
    "correctOption": "",
    "answer": "Vertical scaling = making one server more powerful (more CPU/RAM). Horizontal scaling = adding more servers and distributing load across them."
  },
  {
    "id": "backend-final-041",
    "topic": "BACKEND INTERVIEW · Horizontal vs Vertical Scaling",
    "question": "What's the hard ceiling on vertical scaling that horizontal scaling doesn't have?",
    "options": [],
    "correctOption": "",
    "answer": "There's a physical/cost limit to how big a single machine can get — eventually you hit the biggest instance type available, and costs grow non-linearly at the high end. Horizontal scaling has no such hard ceiling (in theory) — you can keep adding machines — but it requires your architecture to actually support distributing work (stateless services, a way to distribute load, a DB that can handle more connections, etc.)."
  },
  {
    "id": "backend-final-042",
    "topic": "BACKEND INTERVIEW · Horizontal vs Vertical Scaling",
    "question": "Why is horizontal scaling harder to implement than vertical, even though it scales further?",
    "options": [],
    "correctOption": "",
    "answer": "Vertical scaling requires zero code changes — just a bigger machine. Horizontal scaling requires your app to be stateless (or externalize state), needs a load balancer, and often surfaces distributed-systems problems you didn't have before — race conditions across instances, cache consistency, session handling. It's more scalable but adds real architectural complexity."
  },
  {
    "id": "backend-final-043",
    "topic": "BACKEND INTERVIEW · Message Queues",
    "question": "Why would you put a queue between two services instead of having Service A call Service B directly?",
    "options": [],
    "correctOption": "",
    "answer": "Decoupling — Service A doesn't need Service B to be online/fast at that exact moment; it just drops a message and moves on. This means: if B is slow or temporarily down, A's requests don't fail or hang — they just wait in the queue until B is ready to process them. It also smooths out traffic spikes — B processes at its own sustainable pace instead of getting hit with a burst directly."
  },
  {
    "id": "backend-final-044",
    "topic": "BACKEND INTERVIEW · Message Queues",
    "question": "What's the difference between \"at-least-once\" and \"exactly-once\" delivery, and why does \"exactly-once\" matter so much in practice?",
    "options": [],
    "correctOption": "",
    "answer": "At-least-once means a message might be delivered/processed more than once (e.g., if the consumer crashes after processing but before acknowledging, the message gets redelivered). Exactly-once guarantees it's processed exactly one time. This matters a lot for things like payments — if \"charge the customer $50\" gets processed twice due to at-least-once delivery, that's a real bug, not just an inefficiency. Many systems achieve \"effectively exactly-once\" by making the operation idempotent rather than by guaranteeing true exactly-once delivery, since true exactly-once is very hard to implement."
  },
  {
    "id": "backend-final-045",
    "topic": "BACKEND INTERVIEW · Message Queues",
    "question": "Give an example of a real scenario where a message queue is the right tool, and explain why doing it synchronously would be worse.",
    "options": [],
    "correctOption": "",
    "answer": "User uploads a video → needs to be transcoded into multiple resolutions. Doing this synchronously means the HTTP request stays open for however long transcoding takes (could be minutes) — bad user experience, and if the server restarts mid-request, the work is lost. With a queue: the upload endpoint just enqueues a \"transcode this video\" message and responds immediately (\"processing\"), and a separate worker picks up the job whenever it's free, retries on failure, and the user gets notified when it's done."
  }
];
