function LinkedList (){
    //创建Node类 来00000定义节点
    let Node  = function (element){
        this.element = element
        this.next = null
    }
    //链表长度
    let length = 0
    //链表头部
    let head = null

    //向链表的末尾添加元素
    this.append = function(element){
        let node = new Node(element)
        //用于指向链表中的元素
        let current 
        if(head ==null){
            //head为null说明链表中没有元素，然后加入一个元素
            //并将head指向这个元素(也就是第一个元素)
            head = node
        }else{
            //如果链表中有元素
            current = head

            //找到链表的最后一个节点
            while(current.next){
                current = current.next
            }
            //找到最后的
            current.next = node
        }
        length ++
    }
    //在指定位置插入元素
    this.insert = function(position,element){
        //创建element的节点
        let node  = new Node(element)
        let current = head
        let previous
        let index = 0
        //判断position是否在正常范围内 0 < position <= length
        if(position > -1 && position <= length){
            //判断是不是在链表头部添加
            if(position == 0){
                node.next = current
                head = node
            } else {
                //找到在position位置的节点
                while(index++ < position){
                    previous = current
                    current = current.next
                }
                //在他的前面添加新的节点
                previous.next = node
                node.next = current
            }
            length ++ 
            return true
        }
        else{
            return false
        }
    }
    //移除元素
    this.remove = function(position){
        //检查position是否有效
        if(position > -1 && position < length){
            let current = head
            let previous
            let index = 0
            if(position ==0){
                //如果是第一个元素
                //让head指向第一个元素的next，也就是指向第二个
                head = current.next
            }else{
                //不是第一个元素
                //循环找到位置
                while(index++ < position){
                    //目标元素的前一个元素
                    previous = current
                    //要查找的目标元素
                    current = current.next
                }
                //将previous的next 和 current的next连接起来，从而删除current
                previous.next = current.next
            }
            length --
            return current.element
        }else{
            return null
        }
    }

    //根据给的元素的值，返回元素的索引
    this.indexOf = function(element){
        let current = head
        let index = -1
        while( current ){
            if(current.element === element){
                break
            }
            current = current.next
            index++
        }
        return index
    }
    //判断链表是否为空
    this.isEmpty = function(){
        return length === 0
    }
    //获取链表大小
    this.size = function(){
        return length
    }
    //获取链表的的头部
    this.getHead = function(){
        return head
    }
    //打印链表
    this.toString = function(){
        let current = head
        let str= ''
        while(current){
            str += current.element + current.next ? ',' : ''
            current = current.next
        }
        return str
    }

}