# toLoaclString

> toLocaleString 方法是一种方便的功能，用于对日期、数字、时间、货币以及数据结构（如 JavaScript 中的数组和类型化数组）进行语言敏感的格式化。toLocaleString 方法使用环境的默认区域设置进行格式化。然而，你可以用它来格式化一个不同于默认的语言。

## 使用方法

    toLoaclString(loacles, options)

    loacles:地区
    options:要格式化的对象

    例:
    console.log(
    (15000).toLocaleString("fr-FR", {
        style: "currency",
        currency: "JPY",
        currencyDisplay: "name",
    })
    ); // => 15 000 yens japonais

    console.log(
    date.toLocaleString("en-US", {
        timeZone: "America/Chicago",
        dayPeriod: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "long",
    })
    ); // => April 10, 2011 at 02:30:10 at night Central Daylight Time

# Intl

> 用于数字、日期和时间的语言敏感的字符串表示。它的用法与 toLocaleString 方法非常相似。

    const numberFormat = new Intl.NumberFormat(locale, options);
    const dateTimeFormat = new Intl.DateTimeFormat(locale, options);

    console.log(new Intl.NumberFormat('en-GB', { style: 'unit', unit: 'kilobyte-per-second'}).format(20)) // 20 kB/s

> 与 toLocaleString 方法不同，你将 locale 和 options 参数传递给构造函数，并调用 format 实例方法。与 toLocaleString 一样，这两个参数都是可选参数
