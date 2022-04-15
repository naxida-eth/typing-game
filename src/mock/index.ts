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

export default Mock.mock('/titles','get',()=>{
    return Mock.Random.title();
})