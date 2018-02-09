var app = new Vue({
    el:"#vue-app",
    data:{
        selectYear:"",
        selectMonth:"",
        selectDD:"",
        firstDay:0,
        monthDate:[],
        selectIndex:-1,
        selectDate:"",  //选中的日期
    },
    mounted:function(){
        var _this=this;
        var container = document.querySelectorAll('#calendar');
        for(var i = 0; i < container.length; i++){                          //为每个特定DOM元素绑定touchstart touchmove时间监听 判断滑动方向
            var x,  X;
            container[i].addEventListener('touchstart', function(event) {   //记录初始触控点横坐标
                x = event.changedTouches[0].pageX;
            });
            container[i].addEventListener('touchend', function(event){
                X = event.changedTouches[0].pageX;                          //记录当前触控点横坐标
                if(X - x > 10){                                             //右滑
                    // alert("右滑");
                    _this.getPreMonth(_this.selectDate);
                }
                if(x - X > 10){                                             //左滑
                    // alert("左滑");
                    _this.getNextMonth(_this.selectDate);
                }
            });
        }
    },
    methods:{
        //初始化日历信息数据
        initCalendarData:function (date) {
            var year=date.getFullYear();//年份
            var month=date.getMonth()+1;//月份
            var dd=date.getDate();//天
            var day=date.getDay();//星期
            //判断一个月多少天？
            date.setMonth(month);
            date.setDate(0);
            var hm=date.getDate();//当前月份的天数
            //判断当前月的1号星期几？
            var fir=1+(day+7-dd%7)%7;  //4
            //判断有多少行
            var row = Math.ceil((hm+fir)/7);  //5
            //判断最后有多少个空格
            var lastSpace = 7*row - hm-fir;
            // console.log(fir+"-"+row+"-"+lastSpace);
            this.monthDate = [];
            for(var i = 0;i<row;i++){
                var arr= [];
                for(var j = 0;j<7;j++){
                    if (i == 0 && j<fir){
                        //第一行
                        arr.push("");
                    }else if(i == 0) {
                        //第一行
                        arr.push(j - fir + 1);
                    }else if (i==(row-1) && j>(6-lastSpace)){
                        //最后一行
                        arr.push("");
                    }else if (i==(row-1) && j<=(6-lastSpace)){
                        //最后一行
                        var value = 7*(row-1)+(j+1)-fir;
                        arr.push(value);
                    }else{
                        var value = 7*(i+1)-fir-6+j;
                        arr.push(value);
                    }
                }
                this.monthDate.push(arr);
            }
            //默认选中的是今天
            this.selectIndex = dd+fir-1;
            //日期合并
            this.selectYear = year;
            if (month< 10){
                this.selectMonth = "0" + month;
            }else{
                this.selectMonth = month;
            }
            if (dd <10){
                this.selectDD = "0" + dd;
            }else{
                this.selectDD = dd;
            }
            this.firstDay = fir;
            this.selectDate = this.selectYear +"-"+ this.selectMonth +"-"+this.selectDD;
        },
        //获取上一个月
        getPreMonth:function () {
            var date= this.selectDate;
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数
            var year2 = year;
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            var d = new Date(Date.parse(t2.replace(/-/g,   "/")));
            this.initCalendarData(d);
        },
        //获取下一个月
        getNextMonth:function () {
            var date= this.selectDate;
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中的月的天数
            var year2 = year;
            var month2 = parseInt(month) + 1;
            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            var d = new Date(Date.parse(t2.replace(/-/g,   "/")));
            this.initCalendarData(d);
        },
        //选择日期
        changeItemColor:function (index) {
            this.selectIndex = index;
            var value  = index - this.firstDay +1;
            if (value <10){
                this.selectDD = "0" + value;
            }else{
                this.selectDD = value;
            }
            this.selectDate = this.selectYear +"-"+ this.selectMonth +"-"+this.selectDD;
            this.getValue(this.selectDate);
        },
    },
    created:function () {
        //获取当前月当前天的数据
        var date=new Date();
        //初始化日历
        this.initCalendarData(date);
    }
})