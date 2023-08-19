## bind
> 使用 bind 让调用函数时，函数的this不会丢失
> 使用 bind 提前将 this 绑定为 之前的user，就算 user 改变，函数的 this 也不会变

      let user = {
        name: 'key',
        say: function (params) {
          console.log(this.name + ' ' + params)
        }
      }
      let foo = user.say.bind(user, 'bind')

      user = {
        say: function () {
          console.log('1')
        }
      }

      foo()
      // key bind