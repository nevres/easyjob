export function distinctBy<T, U extends keyof T>(
  array: Array<T>,
  property: U,
  comparissonFunc?: (prop1: T[U], prop2: T[U]) => boolean
) {
  const result: Array<T> = [];
  const map = new Array<T[U]>();
  for (const item of array) {
    var propertyValue = item[property];

    var existsAlready: boolean = false;
    if (comparissonFunc) {
      existsAlready = map.find((x) => comparissonFunc(x, propertyValue)) !== undefined;
    } else {
      existsAlready = map.find((x) => x === propertyValue) !== undefined;
    }

    if (!existsAlready) {
      map.push(propertyValue);
      result.push(item);
    }
  }
  return result;
}
