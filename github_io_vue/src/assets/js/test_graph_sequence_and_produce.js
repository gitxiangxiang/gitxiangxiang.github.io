function test_gs(sequence, vertexs, edges){
    console.log(sequence)
    let object_sequence = []
    let i
    vertexs.length = 0
    edges.length = 0
    for(i=0;i<sequence.length;i++){
        vertexs[i] = {name: String(i+1)}
    }
    try{
        for(let j=0;j<sequence.length;j++){
            if(sequence[j] != '' && typeof Number(sequence[j]) === 'number' && Number(sequence[j])%1 === 0)
                object_sequence[j] = {
                    name: String(j+1),
                    data: Number(sequence[j])
                }
            else throw new Error("invalid data")
        }
    }catch(error){
        throw new Error("invalid data")
    }
    return do_test(object_sequence, 0, edges)
}

function do_test(sequence, cnt, edges){
        console.log(sequence)

    sequence.sort(function(a, b){return b.data - a.data})
    let i
    let boundary = sequence[0].data+1
    if (sequence.length-cnt < boundary)
        throw new Error("not GS")
    for(i=0;i<sequence.length;i++){
        if (sequence[i].data < 0){
            throw new Error("not GS")
        }
    }
    if(sequence[0].data === 0) return true
    sequence[0].data = 0
    for(i=1;i<boundary;i++){
        sequence[i].data--
        edges[edges.length] = {
            source : String(sequence[0].name),
            target : String(sequence[i].name)
        }
    }
    console.log(sequence)
    do_test(sequence, cnt+1, edges)
}  

export default test_gs; do_test