import React, { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

import "./styles.less";

// handle loading
const loadingSubject = new BehaviorSubject(false);

export const toggleLoading = (value) => {
  loadingSubject.next(value);
};

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const toggleLoading = (value) => {
    if (value) {
      setCount((previous) => previous + 1);
    } else {
      setCount((previous) => (previous > 0 ? previous - 1 : 0));
    }
  };
  useEffect(() => {
    if (count > 0) {
      !isLoading && setIsLoading(true);
    } else {
      isLoading && setIsLoading(false);
    }
  }, [count]);

  useEffect(() => {
    const subscribe = loadingSubject.subscribe((value) => {
      toggleLoading(value);
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  return isLoading ? (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loader"></div>
        <p className="loading-text">Loading</p>
      </div>
    </div>
  ) : null;
};

export default Loading;
