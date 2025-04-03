function lazyMemo(factory) {
  let cached;

  return () => {
    if (cached === undefined) {
      cached = factory();
    }

    return cached;
  };
}

export default lazyMemo;
