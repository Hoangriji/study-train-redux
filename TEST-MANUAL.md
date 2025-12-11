# 🧪 HƯỚNG DẪN TEST THỦ CÔNG

## Mở ứng dụng
1. Chạy: `npm run dev`
2. Mở: `http://localhost:5173`

---

## ✅ Test Case 1: Initial Load
**Mục đích**: Kiểm tra load dữ liệu ban đầu

### Các bước:
1. Refresh trang
2. Kiểm tra:
   - [ ] Loading spinner hiển thị
   - [ ] Dữ liệu load thành công
   - [ ] Bảng hiển thị 10 items (default limit)
   - [ ] Các cột: Avatar, Name, Email, Phone, City, Job, Created At
   - [ ] Sort by: Created Date, Order: Descending (default)

---

## ✅ Test Case 2: Virtual Scroll
**Mục đích**: Kiểm tra chỉ render items visible

### Các bước:
1. Mở DevTools → Elements tab
2. Tìm `<tbody>` trong table
3. Đếm số `<tr>` đang render
4. Scroll lên xuống
5. Kiểm tra:
   - [ ] Số `<tr>` thay đổi khi scroll (không phải tất cả 10 items)
   - [ ] Smooth scrolling (không lag)
   - [ ] Total height của tbody đúng (60px × số items)

---

## ✅ Test Case 3: Infinite Scroll
**Mục đích**: Tự động load thêm data khi scroll gần cuối

### Các bước:
1. Scroll xuống cuối bảng (98%)
2. Kiểm tra:
   - [ ] Loading indicator "Loading more..." hiển thị
   - [ ] Data mới được append vào cuối
   - [ ] Tổng số items tăng lên
   - [ ] Có thể tiếp tục scroll
3. Scroll xuống hết cho đến khi không còn data
4. Kiểm tra:
   - [ ] Message "All data loaded" hiển thị
   - [ ] Không load thêm nữa

---

## ✅ Test Case 4: Sort By
**Mục đích**: Thay đổi trường sắp xếp

### Các bước:
1. Chọn "Sort by: Name"
2. Kiểm tra:
   - [ ] Danh sách reset (clear hết)
   - [ ] Loading
   - [ ] Load lại từ page 1
   - [ ] Data được sort theo Name
3. Chọn "Sort by: Email"
4. Kiểm tra tương tự

---

## ✅ Test Case 5: Sort Order
**Mục đích**: Đổi thứ tự sắp xếp

### Các bước:
1. Chọn "Order: Ascending"
2. Kiểm tra:
   - [ ] Danh sách reset
   - [ ] Load lại
   - [ ] Data sort ascending
3. Chọn "Order: Descending"
4. Kiểm tra tương tự

---

## ✅ Test Case 6: Limit
**Mục đích**: Thay đổi số items/page

### Các bước:
1. Chọn "Show: 20"
2. Kiểm tra:
   - [ ] Danh sách reset
   - [ ] Load 20 items
3. Chọn "Show: 50"
4. Kiểm tra load 50 items
5. Chọn "Show: 100"
6. Kiểm tra load 100 items

---

## ✅ Test Case 7: Add Person
**Mục đích**: Thêm person mới

### Các bước:
1. Click "Add Person"
2. Kiểm tra:
   - [ ] Modal popup hiển thị
   - [ ] Form có fields: Name, Email, Avatar URL
3. Nhập:
   - Name: "Test User"
   - Email: "test@example.com"
   - Avatar: "https://via.placeholder.com/150"
4. Click "Add Person"
5. Kiểm tra:
   - [ ] Loading spinner trên button
   - [ ] Modal đóng
   - [ ] Toast "Person added successfully" hiển thị
   - [ ] Person mới xuất hiện ở đầu danh sách

### Test validation:
1. Click "Add Person"
2. Để trống Name và Email
3. Click "Add Person"
4. Kiểm tra:
   - [ ] Error toast hiển thị

---

## ✅ Test Case 8: Edit Person (Inline)
**Mục đích**: Sửa thông tin person

### Các bước:
1. Click "Edit" ở row đầu tiên
2. Kiểm tra:
   - [ ] Row chuyển sang edit mode
   - [ ] Input fields hiển thị (Name, Email)
   - [ ] Other fields read-only
   - [ ] Buttons: Save, Cancel
3. Thay đổi Name thành "Updated Name"
4. Click "Save"
5. Kiểm tra:
   - [ ] Loading trên button
   - [ ] Row quay về view mode
   - [ ] Toast "Person updated successfully"
   - [ ] Name đã được update

### Test cancel:
1. Click "Edit"
2. Thay đổi Name
3. Click "Cancel"
4. Kiểm tra:
   - [ ] Row quay về view mode
   - [ ] Name không thay đổi

---

## ✅ Test Case 9: Delete Person
**Mục đích**: Xóa person

### Các bước:
1. Click "Delete" ở row đầu tiên
2. Kiểm tra:
   - [ ] Confirm dialog hiển thị
   - [ ] Message: "Are you sure you want to delete [name]?"
3. Click "Cancel"
4. Kiểm tra:
   - [ ] Dialog đóng
   - [ ] Person không bị xóa
5. Click "Delete" lại
6. Click "Confirm"
7. Kiểm tra:
   - [ ] Dialog đóng
   - [ ] Toast "Person deleted successfully"
   - [ ] Person biến mất khỏi danh sách

---

## ✅ Test Case 10: LocalStorage Persistence
**Mục đích**: Settings được lưu khi refresh

### Các bước:
1. Thay đổi:
   - Limit: 50
   - Sort by: Name
   - Order: Ascending
2. Refresh trang (F5)
3. Kiểm tra:
   - [ ] Limit vẫn là 50
   - [ ] Sort by vẫn là Name
   - [ ] Order vẫn là Ascending

---

## ✅ Test Case 11: Error Handling - Initial Load
**Mục đích**: Hiển thị error page khi API fail

### Các bước:
1. Tắt mạng (offline)
2. Refresh trang
3. Kiểm tra:
   - [ ] Error page hiển thị
   - [ ] Error icon
   - [ ] Error message
   - [ ] "Try Again" button
4. Bật mạng lại
5. Click "Try Again"
6. Kiểm tra:
   - [ ] Data load thành công

---

## ✅ Test Case 12: Error Handling - CRUD
**Mục đích**: Toast error khi CRUD fail

### Các bước (simulate):
1. Try to add person với invalid data
2. Kiểm tra:
   - [ ] Toast error hiển thị

---

## ✅ Test Case 13: Toast Auto-dismiss
**Mục đích**: Toast tự đóng sau 3s

### Các bước:
1. Trigger bất kỳ action nào hiển thị toast
2. Kiểm tra:
   - [ ] Toast hiển thị
   - [ ] Sau 3 giây toast tự biến mất

### Test manual close:
1. Trigger toast
2. Click nút X trên toast
3. Kiểm tra:
   - [ ] Toast đóng ngay lập tức

---

## ✅ Test Case 14: Responsive & UI
**Mục đích**: Kiểm tra giao diện

### Kiểm tra:
- [ ] Table responsive (scroll ngang nếu cần)
- [ ] Colors: Navy blue (#1e3a8a) cho header, buttons
- [ ] Font Awesome icons hiển thị đúng
- [ ] Hover effects hoạt động
- [ ] Animations smooth
- [ ] Loading spinners hiển thị đẹp

---

## ✅ Test Case 15: Browser Console
**Mục đích**: Không có errors

### Các bước:
1. Mở DevTools → Console
2. Thực hiện tất cả actions
3. Kiểm tra:
   - [ ] Không có errors (màu đỏ)
   - [ ] Không có warnings (màu vàng)

---

## 📊 Kết quả Test

| Test Case | Status | Notes |
|-----------|--------|-------|
| 1. Initial Load | ☐ | |
| 2. Virtual Scroll | ☐ | |
| 3. Infinite Scroll | ☐ | |
| 4. Sort By | ☐ | |
| 5. Sort Order | ☐ | |
| 6. Limit | ☐ | |
| 7. Add Person | ☐ | |
| 8. Edit Person | ☐ | |
| 9. Delete Person | ☐ | |
| 10. LocalStorage | ☐ | |
| 11. Error Initial | ☐ | |
| 12. Error CRUD | ☐ | |
| 13. Toast | ☐ | |
| 14. UI/Responsive | ☐ | |
| 15. Console Clean | ☐ | |

---

## ✅ PASS CRITERIA

Để pass tất cả tests:
- Tất cả checkbox phải được check ✅
- Không có errors trong console
- UI/UX mượt mà
- Features hoạt động như mô tả

**Good luck! 🚀**
