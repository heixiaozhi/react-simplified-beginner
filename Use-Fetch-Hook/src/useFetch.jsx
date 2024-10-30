import { useEffect, useState } from "react";

export function useFetch(url, options) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // 设置fetch前加载状态
    setIsLoading(true);
    setIsError(false);
    setData(undefined);
    // 控制中断请求
    const abortController = new AbortController();
    fetch(url, options)
      .then((res) => {
        // catch捕捉网络错误或者 throw new Error 以及 Promise.reject()
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
    return () => {
      // 当组件卸载时中断请求
      console.log("sss");
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, isError };
}
