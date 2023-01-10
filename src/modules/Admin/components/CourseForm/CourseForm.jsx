import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import toastMessage from "components/Toast/toastMessage";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";
import "./courseForm.scss";

const { Option } = Select;
const { TextArea } = Input;

const CourseForm = ({ course }) => {
  const [imgPreview, setImgPreview] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (course && course.hinhAnh) setImgPreview(course.hinhAnh);
  }, [user]);

  const { data: categories } = useRequest(() => courseAPI.getCategory());

  const { data: handleAddCourse, isLoading: addLoading } = useRequest(
    (course) => courseAPI.addCourse(course),
    { isManual: true }
  );

  const { data: handleUpdateCourse } = useRequest(
    (course) => courseAPI.updateCourse(course),
    { isManual: true }
  );

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      maKhoaHoc: course?.maKhoaHoc || "",
      biDanh: course?.biDanh || "",
      tenKhoaHoc: course?.tenKhoaHoc || "",
      moTa: course?.moTa || "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: course?.hinhAnh || "",
      maNhom: "GP01",
      ngayTao: course?.ngayTao ? moment(course.ngayTao) : "",
      maDanhMucKhoaHoc: course ? course.danhMucKhoaHoc.maDanhMucKhoahoc : "",
      taiKhoanNguoiTao: course?.nguoiTao.taiKhoan || user?.taiKhoan,
    },
    mode: "onTouched",
  });

  const onFinish = async (values) => {
    const date = moment(values?.ngayTao).format("DD/MM/YYYY");
    const newValues = {
      ...values,
      ngayTao: date,
      hinhAnh: values.hinhAnh.name,
    };

    if (!course) {
      try {
        await handleAddCourse(newValues);
        toast.success(toastMessage("Tạo thành công"));
        navigate("/admin/courses");
      } catch (error) {
        toast.error(toastMessage("Tạo thất bại", error));
      }
    } else {
      try {
        await handleUpdateCourse(newValues);
        toast.success(toastMessage("Cập nhật thành công"));
        navigate("/admin/courses");
      } catch (error) {
        toast.error(toastMessage("Cập nhật thất bại", error));
      }
    }
  };

  const handleChangeImg = (evt) => {
    const file = evt.target.files[0];

    if (!file) return;

    // Lưu file vào field hinhAnh của hook form
    setValue("hinhAnh", file);

    // Xử lý hiển thị hình ảnh ra giao diện
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // bất đồng bộ
    fileReader.onload = (evt) => {
      // Đọc file thành công
      // evt.target.result: string base64
      setImgPreview(evt.target.result);
    };
  };

  return (
    <Form
      className="user__form"
      onFinish={handleSubmit(onFinish)}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      disabled={addLoading}
    >
      {/* Mã khoá học */}
      <Controller
        name="maKhoaHoc"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          maxLength: {
            value: 12,
            message: "Nhập tối đa 12 ký tự",
          },
          minLength: {
            value: 4,
            message: "Tối thiểu 4 ký tự",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Mã khoá học"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input
              type="text"
              {...field}
              disabled={!!course}
              spellCheck={false}
            />
          </Form.Item>
        )}
      />

      {/* danh mục khoá học */}
      <Controller
        name="maDanhMucKhoaHoc"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Bạn chưa chọn Loại khoá học",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Danh mục khoá học"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Select
              {...field}
              defaultValue=""
              style={{
                width: 200,
              }}
            >
              <Option value="">Loại khoá học</Option>
              {categories?.map((item, index) => (
                <Option key={index} value={item?.maDanhMuc}>
                  {item?.tenDanhMuc}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
      />

      {/*Tên khoá học  */}
      <Controller
        name="tenKhoaHoc"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          minLength: {
            value: 4,
            message: "Tối thiểu 4 ký tự",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Tên khoá học"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input type="text" {...field} spellCheck={false} />
          </Form.Item>
        )}
      />
      {/* Bí danh */}
      <Controller
        name="biDanh"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          minLength: {
            value: 4,
            message: "Tối thiểu 4 ký tự",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Bí danh"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input type="text" {...field} spellCheck={false} />
          </Form.Item>
        )}
      />

      {/* Người tạo */}
      <Controller
        name="taiKhoanNguoiTao"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          minLength: {
            value: 4,
            message: "Tối thiểu 4 ký tự",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Người tạo"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input type="text" {...field} disabled spellCheck={false} />
          </Form.Item>
        )}
      />

      {/*Ngày tạo  */}
      <Controller
        name="ngayTao"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Chưa chọn ngày tạo khoá học",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Ngày tạo"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <DatePicker
              {...field}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày"
            />
          </Form.Item>
        )}
      />

      {/* Hình ảnh */}
      <Controller
        name="hinhAnh"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Hình ảnh không được để trống",
          },
        }}
        render={({ field: { ref }, fieldState: { error } }) => (
          <Form.Item
            label="Hình ảnh"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <input
              ref={ref}
              type="file"
              accept="image/png, image/jpeg"
              name="file"
              id="file"
              onChange={handleChangeImg}
              style={{ display: "none" }}
            />

            <div
              className="addImg-btn"
              onClick={() => document.getElementById("file").click()}
            >
              Thêm ảnh
            </div>

            <br />

            {imgPreview && (
              <img style={{ width: "100px" }} src={imgPreview} alt="preview" />
            )}
          </Form.Item>
        )}
      />

      {/*Mô tả  */}
      <Controller
        name="moTa"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Mô tả không được để trống",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Mô tả"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <TextArea {...field} rows={3} spellCheck={false} />
          </Form.Item>
        )}
      />

      <Form.Item label="Thao tác">
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "160px", borderRadius: "15px", padding: "8px" }}
          >
            {course ? "Cập nhật" : "Thêm"}
          </button>
          <div
            className="btn btn-secondary"
            style={{ padding: "8px", width: "100px", marginLeft: "10px" }}
            onClick={() => navigate("/admin/courses")}
          >
            Huỷ
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CourseForm;
