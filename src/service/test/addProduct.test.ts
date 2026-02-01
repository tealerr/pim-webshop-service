import { Request, Response } from "express"
import { addProduct } from "../insertProduct"
import Product from "../../models/product.model"

jest.mock("../../models/product.model", () => ({
    __esModule: true,
    default: {
        findOne: jest.fn(),
        save: jest.fn(),
    },
}))

describe("addProduct", () => {
    let req: Partial<Request>
    let res: jest.MockedObjectDeep<Response>

    beforeEach(() => {
        req = { body: {} }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as jest.MockedObjectDeep<Response>
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should return 400 if required fields are missing", async () => {
        await addProduct(req as Request, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error: "Missing required fields",
        })
    })

    it("should create a new product if it doesn't exist", async () => {
        const mockProductSave = jest.fn()
        const newProduct = {
            name: "Test Product",
            productId: "testProductId",
            count: 1,
            price: 10,
            save: mockProductSave,
        }

        req.body = {
            name: "Test Product",
            productId: "testProductId",
            count: 1,
            price: 10,
        }
        ;(Product.findOne as jest.Mock).mockResolvedValueOnce(null)
        ;(Product as any as jest.Mock).mockImplementationOnce(() => newProduct)

        await addProduct(req as Request, res)

        expect(mockProductSave).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({
            message: "Product has been created successfully!",
            product: {
                name: newProduct.name,
                productId: newProduct.productId,
                price: newProduct.price,
                count: newProduct.count,
            },
        })
    })
})
