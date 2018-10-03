function loaded(){
    document.forms['local'].elements['name'].focus();
    // alert(localStorage.getItem('name'));

    let app = new Vue({
        el: "#app",
        data: {
            is_name : false,
            first_time: false,
            name: localStorage.getItem('name'),
            off: true,
            op: false,
            display_text: null,
            sum: '0',
            current_op: "",
            oldnum: 0,
            newnum: 0,
            b_decimal: null,
            a_decimal: null
        },
        methods: {
            storename: function(){
                $form = document.forms['local'];
                $input = $form.elements['name'];
                localStorage.setItem('name',$input.value);
                this.is_name = true;
            },
            punch: function(yea,type){
                if(yea == 'on' || yea == 'off'){
                    this.off = !this.off
                    this.display_text = '0'
                    this.sum = '0'
                    this.oldnum = 0
                    this.newnum = 0
                    this.current_op = ''
                    this.op = false
                }
                else{
                    if(this.display_text == null){
                        this.display_text = '0'
                        this.sum = 0
                    }
                    
                    else if(yea == 'ce'){
                        this.display_text = '0'
                        this.sum = 0
                        this.oldnum = 0
                        this.newnum = 0
                        this.current_op = 0
                        this.op = false

                    }
                    
                    else if(yea == 'c'){
                        this.separate('+',this.display_text)
                        this.separate('/',this.display_text)
                        this.separate('*',this.display_text)
                        this.separate('-',this.display_text)
                        // this.display_text = '0'
                        this.newnum = ''
                    }

                    else{
                        if(this.display_text == '0'){
                            if(yea == '00' || type == 'percent' || type == 'enter'){
                                this.display_text = '0'
                            }
                            else if(type == 'dot'){
                                this.display_text = '0.'
                            }
                            else if(type == 'num'){
                                this.display_text = yea
                            }
                            else{
                                this.display_text = '0'+ yea
                            }
                        }
                        else{
                            

                            if(this.op == true){
                                
                                if(type == 'num'){
                                    this.display_text += yea
                                    
                                    if(this.sum == '0' || this.sum == 0){
                                        switch(this.current_op){
                                            case '+':
                                                this.separate("+",this.display_text)
                                                this.sum = this.oldnum + this.newnum
                                                break
                                            case '-':
                                                this.separate("-",this.display_text)
                                                this.sum = this.oldnum - this.newnum
                                                break
                                            case '*':
                                                this.separate("*",this.display_text)
                                                this.sum = this.oldnum * this.newnum
                                                break
                                            case '/':
                                                this.separate("/",this.display_text)
                                                this.sum = this.oldnum / this.newnum
                                                break
                                        }
                                    }
                                    else{
                                        this.calc
                                    }
                                    
                                }
                                else if(type == 'action'){
                                    this.display_text += yea
                                    this.current_op = yea
                                    this.op = false
                                }
                            }
                            else{
                                if(type == 'action'){
                                    this.op = true
                                    this.current_op = yea;
                                }
                                this.display_text += yea
                            }
                        }

                    }
                }
            },
            checktext: function(text,num){
                if(text.indexOf('+') != -1){
                    this.add(text)
                }
                else if(text.indexOf('-') != -1){
                    this.minus(text)
                }
                else if(text.indexOf('*') != -1){
                    this.times(text)
                }
                else if(text.indexOf('/') != -1){
                    this.divide(text)
                }
                
            },
            add: function(text){
                let oldnum = Number(text.substr(0,text.indexOf('+')))
                let newnum = Number(text.substr(text.indexOf('+')+1,text.length))
                // if(this.sum == '0' || this.sum == 0){
                    this.sum = oldnum + newnum
                // }
                // else{
                //     this.sum += newnum
                // }
                // this.sum = old + current
                
            },
            minus: function(text){
                let oldnum = Number(text.substr(0,text.indexOf('-')-1))
                let newnum = Number(text.substr(text.indexOf('-')+1,text.length))
                if(this.sum == '0' || this.sum == 0){
                    this.sum = oldnum - newnum
                }
                else{
                    this.sum -= newnum
                }
                // this.sum = old - current
            },
            times: function(text){
                let oldnum = Number(text.substr(0,text.indexOf('*')))
                let newnum = Number(text.substr(text.indexOf('*')+1,text.length))
                if(this.sum == '0' || this.sum == 0){
                    this.sum = oldnum * newnum
                }
                else{
                    this.sum *= newnum
                }
                // this.sum = old * current
            },
            divide: function(text){
                let oldnum = Number(text.substr(0,text.indexOf('/')))
                let newnum = Number(text.substr(text.indexOf('/')+1,text.length))
                if(this.sum == '0' || this.sum == 0){
                    this.sum = oldnum / newnum
                }
                else{
                    this.sum /= newnum
                }
                // this.sum = old / current
            },
            decimal: function(text){
                this.b_decimal = text.substr(0,text.indexOf('.')-1)
                this.a_decimal = text.substr(text.indexOf('.')-1,text.length)

            },
            separate: function(action,text){
                
                this.oldnum = Number(text.substr(0,text.indexOf(action)))
                this.newnum = Number(text.substr(text.indexOf(action)+1,text.length))

            },
            // percent: function(text){
            //     let actions = ['+','-','/','*']
            //     actions.forEach(element => {
            //         if(text.indexOf(element) != 1){
            //             if(text.indexOf('.') != 1){
            //                 console.log('no decimal')
            //             }
            //             else{
            //                 this.decimal(text)
            //                 let after = (Number(this.a_decimal) * 100)/(10^this.a_decimal.length)
            //                 if(Number(this.b_decimal) == 0){
            //                     this.display_text = after+'%'
            //                 }
            //                 else{
            //                     let total = (Number(this.b_decimal)*100) + after
            //                     this.display_text = total + '%'
            //                 }
            //             }
            //         }
            //         else{
            //             // put in error message here
            //         }
            //     });
            // }
        },
        computed:{
            calc: function(){
                switch(this.current_op){
                    case '+':
                        this.separate("+",this.display_text)
                        this.sum += this.newnum
                        break
                    case '-':
                        this.separate("-",this.display_text)
                        this.sum -= this.newnum
                        break
                    case '*':
                        this.separate("*",this.display_text)
                        this.sum = this.oldnum * this.newnum
                        break
                    case '/':
                        this.separate("/",this.display_text)
                        this.sum = this.oldnum / this.newnum
                        break
                }
            }
            // todec: function(){
            //     return Number(this.b_decimal+'.'+this.a_decimal)
            // }
        },
        mounted: () => {
            if(localStorage.getItem('name') == ""){
                this.is_name = false;
            }
            else{
                this.is_name = true;
                this.first_time = true;
            }
        }
    });
}