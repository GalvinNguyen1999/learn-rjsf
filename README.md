# Form Builder - Drag & Drop

Ứng dụng xây dựng form với giao diện kéo thả chuyên nghiệp sử dụng React JSON Schema Form (RJSF) và Chakra UI, được thiết kế giống như [demo.formengine.io](https://demo.formengine.io/).

## ✨ Tính năng chính

### 🎯 **Giao diện chuyên nghiệp**
- **3-panel layout**: Field palette, Form builder, Properties panel
- **Header toolbar**: Form settings, Preview mode, Schema viewer, Save form
- **Responsive design**: Hoạt động tốt trên mọi thiết bị
- **Modern UI**: Chakra UI với animations và hover effects

### 📝 **Field Types phong phú**
- **Basic Fields**: Text, Email, Number, Textarea, Password, Phone, URL
- **Choice Fields**: Select dropdown, Radio buttons, Checkbox
- **Date & Time**: Date picker, Date & Time picker
- **Advanced Fields**: File upload, Image upload, Address, Credit card

### ⚙️ **Properties Panel**
- **Field Properties**: Label, placeholder, help text, required
- **Validation**: Min/max length, min/max value, pattern
- **Options**: Custom options cho select/radio fields
- **Form Settings**: Title, description, submit/reset button text

### 🔧 **Tính năng nâng cao**
- **Drag & Drop**: Kéo thả để sắp xếp fields
- **Field Selection**: Click để chọn và chỉnh sửa field
- **Duplicate Fields**: Sao chép field nhanh chóng
- **Preview Mode**: Xem trước form với validation
- **Schema Export**: Xuất JSON Schema và UI Schema
- **Form Settings**: Cấu hình form title, description, buttons

## 🚀 Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📖 Hướng dẫn sử dụng

### 1. **Thêm Field**
- Click vào field type trong palette bên trái
- Fields được nhóm theo category: Basic, Choice, Date & Time, Advanced
- Field sẽ được thêm vào form và tự động được chọn

### 2. **Chỉnh sửa Field**
- **Click field** để chọn và hiển thị properties panel
- **Edit label**: Click icon edit (✏️) để chỉnh sửa tên field
- **Properties panel**: Chỉnh sửa placeholder, help text, validation rules
- **Duplicate**: Click icon copy để sao chép field
- **Delete**: Click icon trash để xóa field

### 3. **Sắp xếp Fields**
- **Drag & Drop**: Kéo icon grip (⋮⋮) để sắp xếp lại thứ tự
- **Visual feedback**: Field được highlight khi kéo

### 4. **Form Settings**
- Click "Form Settings" để cấu hình:
  - Form title và description
  - Submit button text
  - Show/hide reset button
  - Reset button text

### 5. **Preview & Export**
- **Preview Mode**: Click "Preview" để xem trước form
- **Schema Viewer**: Click "Schema" để xem JSON Schema và UI Schema
- **Save Form**: Click "Save Form" để lưu cấu hình

## 🎨 Giao diện

### **Header Toolbar**
```
[Form Settings] [Preview] [Schema] [Save Form]
```

### **3-Panel Layout**
```
┌─────────────┬─────────────────┬─────────────┐
│   Field     │   Form Builder  │ Properties  │
│  Palette    │                 │   Panel     │
│             │                 │             │
│ • Basic     │  ┌─────────────┐ │ Field Props │
│ • Choice    │  │ Field 1     │ │ • Label     │
│ • Date      │  │ Field 2     │ │ • Required  │
│ • Advanced  │  │ Field 3     │ │ • Validation│
└─────────────┴─────────────────┴─────────────┘
```

## 🛠️ Công nghệ sử dụng

- **Next.js 15**: React framework với App Router
- **@rjsf/chakra-ui**: React JSON Schema Form với Chakra UI theme
- **@dnd-kit**: Thư viện drag & drop hiện đại
- **Chakra UI**: Component library với design system
- **TypeScript**: Type safety và IntelliSense
- **React Icons**: Icon library phong phú

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Form Builder page
│   └── demo/
│       └── page.tsx           # Demo form page
└── components/
    ├── FormBuilder.tsx        # Main builder component
    ├── FieldPalette.tsx       # Field palette sidebar
    ├── SortableFormField.tsx  # Draggable field component
    └── PropertiesPanel.tsx    # Properties editor panel
```

## 🔧 Tính năng kỹ thuật

### **Field Types Support**
- **Text Input**: Single line text với validation
- **Email**: Email validation với pattern
- **Number**: Numeric input với min/max values
- **Textarea**: Multi-line text với rows config
- **Password**: Password field với masking
- **Phone**: Phone number với format validation
- **URL**: URL validation với format check
- **Select**: Dropdown với custom options
- **Radio**: Radio buttons với options
- **Checkbox**: Boolean checkbox với default value
- **Date**: Date picker với min/max date
- **DateTime**: Date & time picker
- **File**: File upload với size/type limits
- **Image**: Image upload với preview
- **Address**: Multi-line address input
- **Credit Card**: Credit card với pattern validation

### **Validation Features**
- **Required fields**: Mark fields as required
- **Length validation**: Min/max length cho text fields
- **Value validation**: Min/max values cho number fields
- **Pattern validation**: Regex patterns cho specific fields
- **Format validation**: Email, URL, date formats

### **Schema Generation**
- **JSON Schema**: Tự động tạo JSON Schema từ fields
- **UI Schema**: Tự động tạo UI Schema cho widgets
- **Validation**: Tích hợp AJV validator
- **Export**: Xuất schema để sử dụng ở nơi khác

## 🎯 So sánh với demo.formengine.io

| Tính năng | Form Builder | demo.formengine.io |
|-----------|-------------|-------------------|
| **Giao diện** | ✅ 3-panel layout | ✅ 3-panel layout |
| **Field Types** | ✅ 15+ field types | ✅ 20+ field types |
| **Properties Panel** | ✅ Full properties | ✅ Full properties |
| **Drag & Drop** | ✅ Smooth DnD | ✅ Smooth DnD |
| **Preview Mode** | ✅ Real-time preview | ✅ Real-time preview |
| **Schema Export** | ✅ JSON + UI Schema | ✅ JSON + UI Schema |
| **Form Settings** | ✅ Title, description | ✅ Title, description |
| **Validation** | ✅ Built-in validation | ✅ Built-in validation |
| **Responsive** | ✅ Mobile friendly | ✅ Mobile friendly |

## 🚀 Roadmap

- [ ] **Layout Options**: Columns, sections, tabs
- [ ] **Conditional Logic**: Show/hide fields based on conditions
- [ ] **Calculations**: Formula fields
- [ ] **File Upload**: Cloud storage integration
- [ ] **Templates**: Pre-built form templates
- [ ] **Collaboration**: Multi-user editing
- [ ] **Version Control**: Form versioning
- [ ] **Analytics**: Form usage analytics

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Acknowledgments

- [React JSON Schema Form](https://rjsf-team.github.io/react-jsonschema-form/) - Form library
- [Chakra UI](https://chakra-ui.com/) - Component library
- [@dnd-kit](https://dndkit.com/) - Drag & drop library
- [demo.formengine.io](https://demo.formengine.io/) - Inspiration
