      function timestampToTime(timestamp) {
        if (typeof timestamp != "number") return false;
        if (timestamp.length === 10) timestamp = timestamp * 1000;
        const date = new Date(timestamp);
        Y = date.getFullYear() + "-";
        M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        D = (date.getDate() < 9 ? "0" + date.getDate() : date.getDate()) + " ";
        h =
          (date.getHours() < 9 ? "0" + date.getHours() : date.getHours()) + ":";
        m =
          (date.getMinutes() < 9
            ? "0" + date.getMinutes()
            : date.getMinutes()) + ":";

s = date.getSeconds() < 9 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      }

let date = new Date()

let s = date.getTime()

console.log(timestampToTime(s))