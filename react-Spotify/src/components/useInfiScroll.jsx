import { useState, useRef, useCallback } from 'react';
import useAxiosInterceptor from '@/utils/request.jsx';

const useInfiScroll = (setList, type) => {
  const { instance } = useAxiosInterceptor();
  const [next, setNext] = useState(null);
  const observer = useRef(null);
  const lastRef = useCallback(
    node => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && next) {
            instance
              .get(next.replace(instance.defaults.baseURL, ''))
              .then(res => {
                if (type === 'categories') {
                  setList(prevList => [
                    ...prevList,
                    ...res.data.categories.items
                  ]);
                  setNext(res.data.categories.next);
                } else if (type === 'album') {
                  setList(prevList => [...prevList, ...res.data.albums.items]);
                  setNext(res.data.albums.next);
                }
              })
              .catch(error => {
                // 处理错误
                console.error(error);
              });
          }
        },
        { threshold: 0.8 }
      );
      if (node) observer.current.observe(node);
    },
    [next]
  );

  return [setNext, lastRef];
};

export default useInfiScroll;
