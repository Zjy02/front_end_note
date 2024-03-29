function DoublyLinkedList () {
    let Node = function(element){
        this.element = element,
        this.next = null,
        this.prev = null
    }

    let length = 0
    let head = null
    let tail = null

    this.insert = function (position,element) {
        if(position > 0 && position <= length){
            let node = new Node(element)
            let current = head
            let previous
            let index = 0
            //在头部添加
            if(position === 0 ){
                if(!head){
                    head = node
                    tail = node
                }else{
                    node.next = current
                    current.prev = node
                    head = node
                }
            } //在尾部添加
            else if( position === length){
                current = tail
                current.next = node
                node.prev = current
                tail = node
            } else {
                while( index++ < position){
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
                current.prev = node
                node.prev = previous
            }
            length++
            return true
        }else{
            return false
        }
    }

    this.removeAt = function (position) {
        if(position > 0 && position <= length){
            let current = head
            let previous
            let index = 0
            if(position === 0){
                head = current.next
                if(length === 1){
                    tail = null
                }else{
                    head.prev = null
                }
            }else if(position === length){
                current = tail
                tail = current.prev
                tail.next = null
            }else{
                while(index++ < position){
                    previous = current
                    current = current.next
                }
                previous.next = current.next
                current.next.prev = previous
            }

            length--
            return current.element
        }else{
            return false
        }
    }
}