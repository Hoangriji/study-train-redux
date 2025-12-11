# Person Management with Redux Toolkit

Ứng dụng quản lý người dùng với Redux Toolkit, hỗ trợ CRUD, Virtual Scroll và Infinite Scroll.

## 🚀 Tính năng

- ✅ **CRUD đầy đủ**: Thêm, sửa (inline), xóa (có confirm) người dùng
- ✅ **Virtual Scroll**: Chỉ render các hàng visible trong viewport để tối ưu performance
- ✅ **Infinite Scroll**: Tự động load thêm data khi scroll đến 98% của bảng
- ✅ **Phân trang thông minh**: Tự detect còn data hay không (API không trả về totalPages)
- ✅ **Sắp xếp**: Theo trường (name, email, createdAt) và thứ tự (asc/desc)
- ✅ **Giới hạn linh hoạt**: Chọn số lượng items/page (10, 20, 50, 100)
- ✅ **LocalStorage**: Lưu cài đặt khi refresh trang
- ✅ **Toast Notification**: Thông báo thành công/lỗi
- ✅ **Error Handling**: Trang lỗi + retry khi API fail
- ✅ **UI hiện đại**: Theme sáng (Trắng + Xanh Navy) với Font Awesome icons

## 🛠️ Công nghệ

- **React 19** - UI Library
- **Redux Toolkit** - State Management với createAsyncThunk
- **Fetch API** - HTTP Client
- **Font Awesome** - Icons
- **Vite** - Build tool
- **CSS thuần** - Styling

## 📦 Cài đặt

```bash
npm install
```

## 🏃 Chạy ứng dụng

### Development
```bash
npm run dev
```
Mở trình duyệt tại: `http://localhost:5173`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## 📁 Cấu trúc dự án

```
src/
├── store/
│   ├── store.js              # Redux store config
│   └── slices/
│       └── personSlice.js    # Person slice với async thunks
├── services/
│   └── personApi.js          # API service với fetch
├── components/
│   ├── PersonTable.jsx       # Table chính với virtual + infinite scroll
│   ├── PersonRow.jsx         # Row component với inline edit
│   ├── AddPersonModal.jsx    # Modal thêm person
│   ├── Toast.jsx             # Toast notification
│   ├── ConfirmDialog.jsx     # Confirm dialog
│   ├── Modal.jsx             # Generic modal wrapper
│   └── ErrorPage.jsx         # Error page
├── App.jsx                   # App root
└── main.jsx                  # Entry point
```

## 🎯 Cách sử dụng

### Thêm Person
1. Click nút **"Add Person"** ở góc trên bên phải
2. Điền thông tin vào form modal
3. Click **"Add Person"** để lưu

### Sửa Person
1. Click nút **"Edit"** ở cột Actions
2. Row sẽ chuyển sang chế độ edit với input fields
3. Chỉnh sửa thông tin
4. Click **"Save"** để lưu hoặc **"Cancel"** để hủy

### Xóa Person
1. Click nút **"Delete"** ở cột Actions
2. Confirm trong dialog popup
3. Person sẽ bị xóa khỏi danh sách

### Sắp xếp & Lọc
- **Show**: Chọn số items/page (10, 20, 50, 100)
- **Sort by**: Chọn trường sắp xếp (Created Date, Name, Email)
- **Order**: Chọn thứ tự (Ascending, Descending)

> **Lưu ý**: Khi thay đổi Sort hoặc Limit, danh sách sẽ reset về page 1

### Infinite Scroll
- Scroll xuống cuối bảng (98%)
- Ứng dụng tự động load thêm data từ API
- Loading indicator hiển thị ở cuối bảng

## 🌐 API

**Endpoint**: `https://671891927fc4c5ff8f49fcac.mockapi.io/v2`

**Query Parameters**:
- `page` - Số trang (bắt đầu từ 1)
- `limit` - Số lượng items/page
- `sortBy` - Trường sắp xếp (name, email, createdAt)
- `order` - Thứ tự (asc, desc)

## 💾 LocalStorage

Ứng dụng tự động lưu các cài đặt sau vào localStorage:
- `personLimit` - Số items/page
- `personSortBy` - Trường sắp xếp
- `personOrder` - Thứ tự sắp xếp

## 🎨 Theme

- **Màu chính**: Xanh Navy (#1e3a8a)
- **Background**: Trắng xám (#f3f4f6)
- **UI**: Hiện đại, clean, responsive

## 📝 License

MIT
