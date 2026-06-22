import asyncio 

async def make_coffee(name: str, seconds: int):
    print(f"Making coffee for {name}...")
    await asyncio.sleep(seconds)

async def main():
    await make_coffee("Alina", 3)
    await make_coffee("Marat", 2)
    await make_coffee("Zara", 1)

asyncio.run(main())