export function smoothScroll(element, target, duration) {
  target = Math.round(target);
  duration = Math.round(duration);
  if (duration < 0) {
    return Promise.reject("bad duration");
  }
  if (duration === 0) {
    element.scrollTop = target;
    return Promise.resolve();
  }

  const start_time = Date.now();
  const end_time = start_time + duration;

  const start_top = element.scrollTop;
  const distance = target - start_top;

  const smooth_step = function (start, end, point) {
    if (point <= start) {
      return 0;
    }
    if (point >= end) {
      return 1;
    }
    let x = (point - start) / (end - start);
    return x * x * (3 - 2 * x);
  };

  return new Promise<void>(function (resolve, reject) {
    let previous_top = element.scrollTop;

    const scroll_frame = function () {
      if (element.scrollTop != previous_top) {
        reject("interrupted");
        return;
      }

      const now = Date.now();
      const point = smooth_step(start_time, end_time, now);
      const frameTop = Math.round(start_top + distance * point);
      element.scrollTop = frameTop;

      if (now >= end_time) {
        resolve();
        return;
      }

      if (
        element.scrollTop === previous_top &&
        element.scrollTop !== frameTop
      ) {
        resolve();
        return;
      }
      previous_top = element.scrollTop;

      window.requestAnimationFrame(scroll_frame);
    };

    window.requestAnimationFrame(scroll_frame);
  });
}
