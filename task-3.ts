class IncrementalMap<K, V> extends Map<K, V> {
  private snaphotsMaps: Map<number, Map<K, V>>;

  constructor() {
    super();
    this.snaphotsMaps = new Map<number, Map<K, V>>();
  }

  snapshot(numberOfSnapshot: number) {
    this.snaphotsMaps.set(numberOfSnapshot, new Map(this));
  }

  loadSnapshot(numberOfSnapshot: number) {
    const snaphsotMap = this.snaphotsMaps.get(numberOfSnapshot);

    if (!snaphsotMap) {
      return;
    }

    // this.clear() // if we need remove not inited on snapshot elements
    this.copyMap(snaphsotMap, this);
  }

  private copyMap(patternMap: Map<K, V>, copiedMap: Map<K, V>) {
    const patternMapIterator = patternMap.entries();
    let entity = patternMapIterator.next().value;

    while (entity) {
      copiedMap.set(entity[0], entity[1]);
      entity = patternMapIterator.next().value;
    }
  }
}

const main = () => {
  const map = new IncrementalMap<string, number>();
  map.set("a", 10);
  map.set("b", 10);

  map.snapshot(1);

  map.set("a", 20);
  map.set("c", 2);

  console.log(map); // { 'a' => 20, 'b' => 10, 'c' => 2 }

  map.loadSnapshot(1);

  console.log(map); // { 'a' => 10, 'b' => 10, 'c' => 2 }
};

main();
