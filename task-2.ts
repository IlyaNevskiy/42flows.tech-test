const task = async <T>(value: T) => {
  await new Promise((r) => setTimeout(r, 100 * Math.random()));
  console.log(value);
};

class AsyncQueue {
  private queue: (() => void)[];
  private iterator: number;

  constructor() {
    this.queue = [];
    this.iterator = 0;
  }

  add(callback: () => void) {
    if (this.iterator === 0) {
      this.next(callback);
      return;
    }

    this.queue.push(callback);
  }

  private async next(callback: () => void): Promise<void> {
    this.iterator++;
    await callback();
    this.iterator--;

    if (this.queue.length > 0) {
      const callback = this.queue.shift();

      if (callback) {
        this.next(callback);
      }
    }
  }
}

const main = () => {
  const queue = new AsyncQueue();

  Promise.all([
    queue.add(() => task(1)),
    queue.add(() => task(2)),
    queue.add(() => task(3)),
    queue.add(() => task(4)),
  ]);
};

main();
