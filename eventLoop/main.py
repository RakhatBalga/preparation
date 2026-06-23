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

# import asyncio 
# import time

# async def cook(dish: str, seconds: int):
#     print(f"Cooking {dish}...")
#     await asyncio.sleep(seconds)
#     print(f"{dish} is ready!")

# async def main():
#     start = time.time()

#     task1 = asyncio.create_task(cook("pasta", 3))
#     task2 = asyncio.create_task(cook("pizza", 2))

#     print("Tasks are running")

#     await task1
#     await task2

#     print(f"Everything done in {time.time() - start:.1f} sec")

# asyncio.run(main())

# import asyncio

# async def greet(name: str):
#     print(f"Hello {name}!")

# # Try 1 — without await
# result = greet("Rakhat")
# print(result)

# # Try 2 — with await
# async def main():
#     await greet("Rakhat")

# asyncio.run(main())

#pydantic v2

# from pydantic import BaseModel, Field
# from typing import Optional

# class Product(BaseModel):
#     name: str = Field (min_length=2, max_length=100)
#     price: float = Field (gt=0, le=10000000)
#     quantity: int = Field (ge=0, le=100000, default=1)
#     description: Optional[str] = None

# from pydantic import BaseModel, Field
# from typing import Optional

# class Product(BaseModel):
#     name: str = Field(min_length=2, max_length=1000)
#     description: Optional[str] = None


# from pydantic import BaseModel, Field, field_validator
# from typing import Optional

# class Product(BaseModel):
#     name: str = Field(min_length=2, max_length=100)
#     description: Optional[str] = None

#     @field_validator("name")
#     @classmethod
#     def validate_name(cls, value):
#         if any(c.isdigit() for c in value):
#             raise ValueError("name cannot contain bad")
#         return value 

#     @field_validator("description")
#     @classmethod
#     def clean_description(cls, value):
#         if value is not None:
#             return value.strip()
#         return value