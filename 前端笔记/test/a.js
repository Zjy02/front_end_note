let arr = [
  {
    id: 1,
    name: '1',
    pid: 0
  },
  {
    id: 2,
    name: '2',
    pid: 1
  },
  {
    id: 3,
    name: '3',
    pid: 1
  },
  {
    id: 4,
    name: '4',
    pid: 3
  },
  {
    id: 5,
    name: '5',
    pid: 4
  }
]
let result = arr[0]
function tree(item, res) {
  if (item.pid == res.id) {
    if (res.children) {
      res.children.push(item)
    } else {
      res.children = []
      res.children.push(item)
    }
  } else {
    if (Array.isArray(res)) {
      tree(item, res[res.length - 1])
    }
    else {
      tree(item, res.children)
    }
  }
}

for (let i = 1; i < arr.length; i++) {
  tree(arr[i], result)
}

console.log(result);