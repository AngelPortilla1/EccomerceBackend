export const createProduct = async (req, res) => {
    try{
        const {name,description,price,stock,imageUrl}= req.body

        res.json({data:{name,description,price,stock,imageUrl}})
    }catch (error){

    }

} 