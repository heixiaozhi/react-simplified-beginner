import { useCallback, useState } from "react";

export function useArray(INITIAL_ARRAY) {
  const [array, setArray] = useState(INITIAL_ARRAY);

  // useCallback 第一次调用会返回给你参数中的函数
  // 下一次如果依赖项没发生变化，依然返回上一次相同的函数
  // 发生变化，则将返回在最新一次渲染中传入的函数，并且将其缓存以便之后使用
  const push = useCallback((value) => {
    setArray((current) => {
      return [...current, value];
    });
  }, []);

  const replace = useCallback((index, value) => {
    setArray((current) => {
      return [...current.slice(0, index), value, ...current.slice(index + 1)];
    });
  }, []);

  const filter = useCallback((fn) => {
    setArray((current) => {
      return current.filter(fn);
    });
  }, []);

  const remove = useCallback((index) => {
    setArray((current) => {
      return [...current.slice(0, index), ...current.slice(index + 1)];
    });
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const reset = useCallback(() => {
    setArray(INITIAL_ARRAY);
  }, []);

  return {
    array,
    // 返回一个属性是函数，函数和对象是引用，所以指向的原函数
    set: setArray,
    push,
    replace,
    filter,
    remove,
    clear,
    reset,
  };
}
