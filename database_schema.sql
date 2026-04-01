-- Admin/Customer Table
CREATE TABLE Admin_Customer (
    U_ID INT PRIMARY KEY,
    Username TEXT,
    Full_name TEXT,
    Role TEXT,
    created_at TIMESTAMP NOT NULL
);

-- Categories Table
CREATE TABLE Categories (
    Cat_ID INT PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT,
    created_at TIMESTAMP NOT NULL
);

-- Suppliers Table
CREATE TABLE Suppliers (
    S_ID INT PRIMARY KEY,
    Name TEXT NOT NULL,
    Contact_name TEXT,
    Email VARCHAR(255),
    Phone INT, -- BIGINT is usually recommended for phones, but sticking to your spec
    Category TEXT,
    P_ID INT
);

-- Products Table
CREATE TABLE Products (
    P_ID INT PRIMARY KEY,
    Name TEXT NOT NULL,
    P_Group TEXT,
    P_Price NUMERIC NOT NULL,
    Stock_qty INT NOT NULL,
    Category_ID INT,
    Supplier_ID INT,
    Order_ID INT
);

-- Orders Table
CREATE TABLE Orders (
    O_ID INT PRIMARY KEY,
    User_ID INT,
    Total_amount NUMERIC NOT NULL,
    Status TEXT,
    Shipping_add TEXT,
    P_ID INT,
    Payment_Type VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);

-- ==========================================
-- Adding Foreign Key Constraints
-- Doing this separately using ALTER TABLE to avoid errors with circular references
-- (e.g., Products referencing Orders and Orders referencing Products)
-- ==========================================

ALTER TABLE Suppliers
ADD CONSTRAINT fk_supplier_product FOREIGN KEY (P_ID) REFERENCES Products(P_ID);

ALTER TABLE Products
ADD CONSTRAINT fk_product_category FOREIGN KEY (Category_ID) REFERENCES Categories(Cat_ID),
ADD CONSTRAINT fk_product_supplier FOREIGN KEY (Supplier_ID) REFERENCES Suppliers(S_ID),
ADD CONSTRAINT fk_product_order FOREIGN KEY (Order_ID) REFERENCES Orders(O_ID);

ALTER TABLE Orders
ADD CONSTRAINT fk_order_user FOREIGN KEY (User_ID) REFERENCES Admin_Customer(U_ID),
ADD CONSTRAINT fk_order_product FOREIGN KEY (P_ID) REFERENCES Products(P_ID);
