Backend/
│
├── Controllers/
│ ├── AuthController.cs
│ ├── UserController.cs
│ ├── ProductController.cs
│ └── OrderController.cs
│
├── Models/
│ ├── User.cs
│ ├── Product.cs
│ └── Order.cs
│
├── DTOs/
│ ├── User/
│ │ ├── UserCreateDto.cs
│ │ └── UserResponseDto.cs
│ │
│ └── Product/
│ ├── ProductCreateDto.cs
│ └── ProductResponseDto.cs
│
├── Data/
│ ├── AppDbContext.cs
│ └── DbSeeder.cs
│
├── Repositories/
│ ├── Interfaces/
│ │ ├── IUserRepository.cs
│ │ └── IProductRepository.cs
│ │
│ ├── UserRepository.cs
│ └── ProductRepository.cs
│
├── Services/
│ ├── Interfaces/
│ │ ├── IUserService.cs
│ │ └── IProductService.cs
│ │
│ ├── UserService.cs
│ └── ProductService.cs
│
├── Middleware/
│ ├── ExceptionMiddleware.cs
│ └── JwtMiddleware.cs
│
├── Helpers/
│ ├── JwtHelper.cs
│ └── PasswordHelper.cs
│
├── Migrations/
│ └── ...
│
├── Configurations/
│ ├── JwtSettings.cs
│ └── DatabaseSettings.cs
│
├── Properties/
│ └── launchSettings.json
├── appsettings.json
├── appsettings.Development.json
├── Program.cs
└── Backend.csproj
└── Backend.http
