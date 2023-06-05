import fs from 'fs'

export default class ProductManager{
    
    constructor(archivo){
        this.archivo = archivo + '.JSON' 
        this.productos = []
        this.Id = 1
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.archivo)) {
                const data = await fs.promises.readFile(this.archivo, "utf-8")
                if (data) {
                    this.productos = JSON.parse(data)
                    return this.productos
                }
            } 
            else console.log("Archivo no encontrado.") 
        }
        catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(id) {
        try {
            if (fs.existsSync(this.archivo)) {
                const data = await fs.promises.readFile(this.archivo, "utf-8")
                if (data) {
                    this.productos = JSON.parse(data)
                    const producto = await this.productos.find((prod) => prod.id === id)
                    if (producto) {
                        return producto
                    } else {
                        console.log(`Not Found.`)
                    }
                }
            } 
            else console.log("No existe el archivo")         
        } 
        catch (error){ 
            throw new Error(error)
        }
    }

    async addProduct(producto) {
        try {
            if (fs.existsSync(this.archivo)) {
                const data = await fs.promises.readFile(this.archivo, "utf-8")
                if (data) {
                    this.productos = JSON.parse(data)
                    
                    if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                        console.log("Faltan datos")
                        return 
                    }
                    if (this.productos.find((prod) => prod.code === producto.code)) {
                        console.log("El código ya existe")
                        return
                    }  
                    producto.id = this.Id++
                    this.productos.push(producto)
                    await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos, null, "\t"))
                }
                console.log("Producto agregado")
            } else {
                producto.id = this.Id++
                await fs.promises.writeFile(this.archivo, JSON.stringify([producto], null, "\t"))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateProductById(id, producto) {
        try {
            if (fs.existsSync(this.archivo)) {
                const data = await fs.promises.readFile(this.archivo, "utf-8")
                if (data) {
                    this.productos = JSON.parse(data)
                    const index = this.productos.findIndex((prod) => prod.id === id)
                    if (index !== -1) {
                        this.productos[index] = { ...this.productos[index], ...producto }
                        await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos, null, "\t"))
                        console.log("Producto Actualizado")
                    }
                    else console.log("Producto no encontrado")
                } 
                else console.log("Archivo no encontrado.")
            }
        } 
        catch (error) { 
            throw new Error(error) 
        }
    }

    async removeProductById(id) {
        try {
            if (fs.existsSync(this.archivo)) {
                const data = await fs.promises.readFile(this.archivo, "utf-8")
                if (data) {
                    this.productos = JSON.parse(data)
                    const index = this.productos.findIndex((prod) => prod.id === id)
                    if (index !== -1) {
                        this.productos.splice(index, 1)
                        await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos, null, "\t"))
                        console.log("Producto eliminado")
                    }
                } 
                else console.log("Producto no encontrado")      
            } 
            else console.log("Archivo no encontrado")
        } 
        catch (error) {
            throw new Error(error)
        }
    }
    async removeAllProducts() {
        try {
            if (fs.existsSync(this.archivo)) {
                const data = await fs.promises.readFile(this.archivo, "utf-8")
                if (data) {
                    this.productos = []
                    await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos, null, "\t"))
                    console.log("Productos Eliminados")
                } 
                else console.log("No se encontraron productos")
            }
        } 
        catch (error) {
            throw new Error(error)
        }
    }
}