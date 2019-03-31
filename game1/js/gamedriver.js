let edgex = 55;
let edgey = 39;
let codes2 = 0;
let position = new Array(2);
position[0] = new Array(2);
position[1] = new Array(2);
let band = new Array(8);
let delay_time = "50";

//初始化
init();
function init() {
    $("table").remove();
    $("body").append("<table></table>");
    for(let i=0;i<40;i++){
        $("table").append("<tr>" +
            "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>" +
            "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>" +
            "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>" +
            "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>" +
            "</tr>");
    }
    //初始触发点
    position[1][0] = randomnum(0,edgex);
    position[1][1] = $("table tr").length-2;
    $("table tr").eq(position[1][1]).eq(0).find("td").eq(position[1][0]).toggleClass("tdscolor");
    let a = randomnum(position[1][0]-7,position[1][0]);
    let b = 0;
    for(let i=a;i<a+8;i++){
        $("table tr").eq($("table tr").length-1).eq(0).find("td").eq(i).toggleClass("td_band");
        band[b++] = i;
    }
}

function band_move(codes) {
    if(codes2==0){
        if(codes==39){
            move_right();
        }else{
            move_left();
        }
        // setTimeout("band_move(codes)",50);
    }else return;
}

//踩板移动 右
function move_right() {
    for(let i=band.length-1;i>=0;i--){
        if(band[i]<edgex-(band.length-1-i)) {
            $("table tr").eq($("table tr").length-1).eq(0).find("td").eq(band[i]).toggleClass("td_band");
            $("table tr").eq($("table tr").length - 1).eq(0).find("td").eq(band[i] + 1).toggleClass("td_band");
            band[i] = band[i]+1;
        }else return;
    }
}

//踩板移动 左
function move_left() {
    for(let i=0;i<band.length;i++){
        if(band[i]>i) {
            $("table tr").eq($("table tr").length-1).eq(0).find("td").eq(band[i]).toggleClass("td_band");
            $("table tr").eq($("table tr").length - 1).eq(0).find("td").eq(band[i] - 1).toggleClass("td_band");
            band[i] = band[i]-1;
        }
    }
}

//生成区间内随机整数
function randomnum(min_num,max_num) {
    var res = 0;
    res = parseInt(Math.random()*max_num)
    while(res<min_num){
        res = parseInt(Math.random()*max_num)
    }
    return res;
}

//移动过程显示处理
function switchs(x,y) {
    $("table tr").eq(position[1][1]).eq(0).find("td").eq(position[1][0]).removeClass("tdscolor");
    $("table tr").eq(y).eq(0).find("td").eq(x).toggleClass("tdscolor");
    position[0][0] = position[1][0];
    position[0][1] = position[1][1];
    position[1][0] = x;
    position[1][1] = y;
}

function game_over() {
    alert("GAME OVER");
    position[0][0] = null;
    position[0][1] = null;
    init();
    return;
}

//触发球移动
function point_move() {
    if(position[1][1]!=edgey) {
        if (position[1][0] == 0) {
            touch_edgel();
        } else if (position[1][0] == edgex) {
            touch_edger();
        } else if (position[1][1] == 0) {
            touch_edgeup();
        } else if (position[1][1] == edgey-1) {
            touch_edgedn();
        } else {
            gostraight();
        }
        setTimeout("point_move()",delay_time);
    }else {
        game_over();
    }
}
//触边 左
function touch_edgel() {
    if(position[0][0]!=null){
        if(position[1][1]>position[0][1]){
            //触角 左下
            if(position[1][1]==edgey){
                $("table tr").eq(position[1][1]).eq(0).find("td").eq(position[1][0]).removeClass("tdscolor");
                if((randomnum(1,11)>5?1:0) == 1){
                    position[1][1] = position[1][1]-1;
                    position[0][0] = position[1][0]+1;
                    position[0][1] = position[1][1]-1;
                    switchs(position[1][0]+1, position[1][1]+1);
                }else {
                    position[1][0] = position[1][0]+1;
                    position[0][0] = position[1][0]+1;
                    position[0][1] = position[1][1]-1;
                    switchs(position[1][0]-1, position[1][1]-1);
                }
            }
            else
                switchs(position[1][0]+1, position[1][1]+1);
        }else if(position[1][1]<position[0][1]){
            if(position[1][1]==0){
                $("table tr").eq(position[1][1]).eq(0).find("td").eq(position[1][0]).removeClass("tdscolor");
                if((randomnum(1,11)>5?1:0) == 0){
                    position[1][1] = position[1][1]+1;
                    position[0][0] = position[1][0]+1;
                    position[0][1] = position[1][1]+1;
                    switchs(position[1][0]+1, position[1][1]-1);
                }else{
                    position[1][0] = position[1][0]+1;
                    position[0][0] = position[1][0]+1;
                    position[0][1] = position[1][1]+1;
                    switchs(position[1][0]-1, position[1][1]+1);
                }
            } else
                switchs(position[1][0]+1, position[1][1]-1);
        }else {
            switchs(position[1][0]+1, position[1][1]);
        }
    }else {
        switchs(position[1][0]+1,position[1][1]-1);
    }
}
//触边 右
function touch_edger() {
    if(position[0][0]!=null){
        if(position[1][1]>position[0][1]){
            if(position[1][1]==edgey){
                $("table tr").eq(position[1][1]).eq(0).find("td").eq(position[1][0]).removeClass("tdscolor");
                if((randomnum(1,11)>5?1:0) == 0){
                    position[1][1] = position[1][1]-1;
                    position[0][0] = position[1][0]-1;
                    position[0][1] = position[1][1]-1;
                    switchs(position[1][0]-1, position[1][1]+1);
                }else{
                    position[1][0] = position[1][0]-1;
                    position[0][0] = position[1][0]-1;
                    position[0][1] = position[1][1]-1;
                    switchs(position[1][0]+1, position[1][1]-1);
                }
            }else
                switchs(position[1][0]-1, position[1][1]+1);
        }else if(position[1][1]<position[0][1]){
            if(position[1][1]==0){
                $("table tr").eq(position[1][1]).eq(0).find("td").eq(position[1][0]).removeClass("tdscolor");
                if((randomnum(1,11)>5?1:0) == 0){
                    position[1][1] = position[1][1]+1;
                    position[0][0] = position[1][0]-1;
                    position[0][1] = position[1][1]+1;
                    switchs(position[1][0]-1, position[1][1]-1);
                }else{
                    position[1][0] = position[1][0]-1;
                    position[0][0] = position[1][0]-1;
                    position[0][1] = position[1][1]+1;
                    switchs(position[1][0]+1, position[1][1]+1);
                }
            }else
                switchs(position[1][0]-1, position[1][1]-1);
        }else {
            switchs(position[1][0]-1, position[1][1]);
        }
    }else {
        switchs(position[1][0]-1,position[1][1]-1);
    }
}
//触边 上
function touch_edgeup() {
    if(position[1][0]>position[0][0]){
        switchs(position[1][0]+1, position[1][1]+1);
    }else if(position[1][0]<position[0][0]){
        switchs(position[1][0]-1, position[1][1]+1);
    }else {
        switchs(position[1][0], position[1][1]+1);
    }
}
//触边 下
function touch_edgedn() {
    if(position[0][0]!=null){
        if(band.indexOf(position[1][0])>=0){
            if(position[1][0]>position[0][0]){
                switchs(position[1][0]+1, position[1][1]-1);
            }else if(position[1][0]<position[0][0]){
                switchs(position[1][0]-1, position[1][1]-1);
            }else {
                switchs(position[1][0], position[1][1]-1);
            }
        }else gostraight();
    }else {
        if((randomnum(1,11)>5?1:0) == 1){
            switchs(position[1][0]+1, position[1][1]-1);
        }else {
            switchs(position[1][0]-1, position[1][1]-1);
        }
    }
}
//按路线移动
function gostraight() {
    if(position[0][0]!=null){
        //向下
        if(position[1][1]>position[0][1]){
            //向右
            if(position[1][0]>position[0][0]){
                switchs(position[1][0]+1, position[1][1]+1);
            }else if(position[1][0]<position[0][0]){
                //向左
                switchs(position[1][0]-1, position[1][1]+1);
            }else{
                //无向
                switchs(position[1][0], position[1][1]+1);
            }
        // 向上
        }else if(position[1][1]<position[0][1]){
            //向右
            if(position[1][0]>position[0][0]){
                switchs(position[1][0]+1, position[1][1]-1);
            }else if(position[1][0]<position[0][0]){
                //向左
                switchs(position[1][0]-1, position[1][1]-1);
            }else{
                //无向
                switchs(position[1][0], position[1][1]-1);
            }
        }else {
        //无向
            if(position[1][0]>position[0][0]){
                switchs(position[1][0]+1, position[1][1]);
            }else{
                switchs(position[1][0]-1, position[1][1]);
            }
        }
    }else {
        if((randomnum(1,11)>5?1:0) == 1){
            switchs(position[1][0]+1, position[1][1]-1);
        }else {
            switchs(position[1][0]-1, position[1][1]-1);
        }
    }
}

// 键盘监听
$(document).keyup(function (e) {
    if(e.keyCode==32&position[0][0]==null){
        point_move();
    }
    if(e.keyCode==39|e.keyCode==37){
        codes2 = 1
    }
});
$(document).keydown(function (e) {
    if(e.keyCode==39|e.keyCode==37){
        codes2=0;
        band_move(e.keyCode);
    }
});