(function($){
function mggScrollImg(box,config){
    this.box = $(box);
    this.config = $.extend({},config||{});
    this.width = this.config.width||this.box.children().eq(0).width();//一次滚动的宽度
    this.size = this.config.size||this.box.children().length;
    this.loop = this.config.loop||true;//默认能循环滚动
    this.auto = this.config.auto||false;//默认自动滚动
    this.auto_wait_time = this.config.auto_wait_time||3000;//轮播间隔
    this.scroll_time = 300;//滚动时长
    this.minleft = -this.width*(this.size-1);//最小left值，注意是负数[不循环情况下的值]
    this.maxleft =0;//最大lfet值[不循环情况下的值]
    this.now_left = 0;//初始位置信息[不循环情况下的值]
    this.point_x = null;//记录一个x坐标
    this.point_y = null;//记录一个y坐标
    this.move_left = false;//记录向哪边滑动
    this.index = 0;
    this.busy = false;
    this.timer;
    this.init();
}
$.extend(mggScrollImg.prototype,{
    init : function(){
        this.bind_event();
        this.init_loop();
        this.auto_scroll();
    },
    bind_event : function(){
        var self = this;
        self.box.bind('touchstart',function(e){
            if(e.touches.length==1 && !self.busy){
                self.point_x = e.touches[0].screenX;
                self.point_y = e.touches[0].screenY;
            }
        }).bind('touchmove',function(e){
            if(e.touches.length==1 && !self.busy){
                return self.move(e.touches[0].screenX,e.touches[0].screenY);//这里根据返回值觉得是否阻止默认touch事件
            }
        }).bind('touchend',function(e){
            !self.busy && self.move_end();
        });
    },
    init_loop : function(){
        if(this.box.children().length == this.size && this.loop){//暂时只支持size和子节点数相等情况的循环
            this.now_left = -this.width;//设置初始位置信息
            this.minleft = -this.width*this.size;//最小left值
            this.maxleft = -this.width;
            this.box.prepend(this.box.children().eq(this.size-1).clone()).append(this.box.children().eq(1).clone()).css(this.get_style(2));
            this.box.css('width',this.width*(this.size+2));
        }else{
            this.loop = false;
            this.box.css('width',this.width*this.size);
        }
    },
    auto_scroll : function(){//自动滚动
        var self = this;
        if(!self.loop || !self.auto)return;
        clearTimeout(self.timer);
        self.timer = setTimeout(function(){
            self.go_index(self.index+1);
        },self.auto_wait_time);
    },
    go_index : function(ind){//滚动到指定索引页面
        var self = this;
        if(self.busy)return;
        clearTimeout(self.timer);
        self.busy = true;
        if(self.loop){//如果循环
            ind = ind<0?-1:ind;
            ind = ind>self.size?self.size:ind;
        }else{
            ind = ind<0?0:ind;
            ind = ind>=self.size?(self.size-1):ind;
        }
        if(!self.loop && (self.now_left == -(self.width*ind))){
            self.complete(ind);
        }else if(self.loop && (self.now_left == -self.width*(ind+1))){
            self.complete(ind);
        }else{
            if(ind == -1 || ind == self.size){//循环滚动边界
                self.index = ind==-1?(self.size-1):0;
                self.now_left = ind==-1?0:-self.width*(self.size+1);
            }else{
                self.index = ind;
                self.now_left = -(self.width*(self.index+(self.loop?1:0)));
            }
            self.box.css(this.get_style(1));
            setTimeout(function(){
                self.complete(ind);
            },self.scroll_time);
        }
    },
    complete : function(ind){//动画完成回调
        var self = this;
        self.busy = false;
        self.config.callback && self.config.callback(self.index);
        if(ind==-1){
            self.now_left = self.minleft;
        }else if(ind==self.size){
            self.now_left = self.maxleft;
        }
        self.box.css(this.get_style(2));
        self.auto_scroll();
    },
    next : function(){//下一页滚动
        if(!this.busy){
            this.go_index(this.index+1);
        }
    },
    prev : function(){//上一页滚动
        if(!this.busy){
            this.go_index(this.index-1);
        }
    },
    move : function(point_x,point_y){//滑动屏幕处理函数
        var changeX = point_x - (this.point_x===null?point_x:this.point_x),
            changeY = point_y - (this.point_y===null?point_y:this.point_y),
            marginleft = this.now_left, return_value = false,
            sin =changeY/Math.sqrt(changeX*changeX+changeY*changeY);
        this.now_left = marginleft+changeX;
        this.move_left = changeX<0;
        if(sin>Math.sin(Math.PI/3) || sin<-Math.sin(Math.PI/3)){//滑动屏幕角度范围：PI/3  -- 2PI/3
            return_value = true;//不阻止默认行为
        }
        this.point_x = point_x;
        this.point_y = point_y;
        this.box.css(this.get_style(2));
        return return_value;
    },
    move_end : function(){
        var changeX = this.now_left%this.width,ind;
        if(this.now_left<this.minleft){//手指向左滑动
            ind = this.index +1;
        }else if(this.now_left>this.maxleft){//手指向右滑动
            ind = this.index-1;
        }else if(changeX!=0){
            if(this.move_left){//手指向左滑动
                ind = this.index+1;
            }else{//手指向右滑动
                ind = this.index-1;
            }
        }else{
            ind = this.index;
        }
        this.point_x = this.point_y = null;
        this.go_index(ind);
    },
    get_style : function(fig){
        var x = this.now_left ,
            time = fig==1?this.scroll_time:0;
        return {
            '-webkit-transition':'-webkit-transform '+time+'ms',
            '-webkit-transform':'translate3d('+x+'px,0,0)',
            '-webkit-backface-visibility': 'hidden',
            'transition':'transform '+time+'ms',
            'transform':'translate3d('+x+'px,0,0)'
        };
    }
});
/*
    这里对外提供调用接口，对外提供接口方法
    next ：下一页
    prev ：上一页
    go ：滚动到指定页
*/
$.mggScrollImg = function(box,config){
    var scrollImg = new mggScrollImg(box,config);
    return {//对外提供接口
        next : function(){scrollImg.next();},
        prev : function(){scrollImg.prev();},
        go : function(ind){scrollImg.go_index(parseInt(ind)||0);}
    };
};
})(Zepto);