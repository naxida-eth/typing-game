import Mock from 'mockjs';

Mock.Random.extend({
    title:function(){
        const titles: string[] = [
            'meat',
            'apple',
            'orange',
            'middle',
            'ringe',
            'mobile',
            'phone',
            'tomorrow',
            'yesterday',
            'Mayday'
        ]
        return this.pick(titles)
    }
})

console.log(Mock.mock('/titles','get',()=>{
    return Mock.Random.title();
}))

// export default Mock.mock('http://localhost:3000/titles','get',()=>{
//     return Mock.Random.title();
// })