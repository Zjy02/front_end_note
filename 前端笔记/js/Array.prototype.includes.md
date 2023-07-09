# includes()

> 用来判断一个数组李是否含有指定的值,包含返回 true
> includes(searchElement, fromIndex)
> searchElement 为要找的元素
> fromIndex 是从哪开始的下标

    可选，默认为0 fromIndex会被装换为整数
    如果fromIndex < 0, 实际使用 fromIndex + arr.length
    如果fromIndex < -arr.length 则使用 0 来搜索整个数组
    如果fromIndex > arr.length 则不会搜索数组 返回false

> includes 采用 object.is()对数组每个元素与 searchElement 进行对比

- 示例:
  let arr = [1,2,3,4,5,,-0,+0,NaN]
  arr.includes(1)//true
  arr.includes(-0)//true
  arr.includes(+0)//true
  arr.includes(NaN)//true
  arr.includes(undefined)//true
