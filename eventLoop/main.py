#Event loop 

# import asyncio
# import time

# async def fetch(site: str, seconds: int):
#     print(f"fetch were send to {site}")
#     await asyncio.sleep(seconds)

# async def main():
#     start = time.time()
#     await asyncio.gather(
#         fetch("google", 3),
#         fetch("github", 2),
#         fetch("youtube", 1)
#     )
#     print(f"Everything is done in {time.time() - start:.1f} sec")

# asyncio.run(main())

# import asyncio 
# import time 

# async def kitchen(dish: str, seconds: int):
#     print(f"Cooking {dish}...")
#     await asyncio.sleep(seconds)
#     print(f"{dish} is ready!")

# async def main():
#     start = time.time()
#     await asyncio.gather(
#         kitchen("salad", 3),
#         kitchen("stake", 3),
#         kitchen("soup", 3)
#     )

#     print(f"Everythin is ready in {time.time() - start:.1f} sec")

# asyncio.run(main())


# def async def

# from fastapi import FastAPI
# import asyncio, time

# app = FastAPI()

# @app.get("/async-wait")
# async def async_endpoint():
#     await asyncio.sleep(2)
#     return {"message":  "done", "type": "async"}

# @app.get("/sync-wait")
# def sync_endpoint():
#     time.sleep(2)
#     return {"message": "done", "type": "sync"}


#gather and create_task()

#gather - start and waits immediately 

# import asyncio, time

# await asyncio.gather(
#     fetch("google", 3),
#     fetch("github", 2),
# )
# print("both done")

# #create_task -starts now, you control when to wait

# task1 = asyncio.create_task(fetch("google", 3))
# task2 = asyncio.create_task(fetch("github", 2))

# print("tasks started!")

# await task1 
# await task2

import asyncio 
import time

async def cook(dish: str, seconds: int):
    print(f"Cooking {dish}...")
    await asyncio.sleep(seconds)
    print(f"{dish} is ready!")

async def main():
    start = time.time()

    task1 = asyncio.create_task(cook("pasta", 3))
    task2 = asyncio.create_task(cook("pizza", 2))

    print("Tasks are running")

    await task1
    await task2

    print(f"Everything done in {time.time() - start:.1f} sec")

asyncio.run(main())