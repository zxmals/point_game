init_environment();

//初始化环境
function init_environment() {
    $("table").remove();
    $("body").append("<table></table>");
    for(let i=0;i<31;i++){
        $("table").append("<tr></tr>");
        for(let j=0;j<43;j++){
            $("table tr").eq(i).append("<td></td>");
        }
    }
}

//生成块
function generate_square(s_type) {

}