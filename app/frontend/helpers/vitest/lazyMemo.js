function lazyMemo(factory) {
  let cached;

  return () => {
    if (!cached) {
      cached = factory();
    }

    return cached;
  };
}

export default lazyMemo;
