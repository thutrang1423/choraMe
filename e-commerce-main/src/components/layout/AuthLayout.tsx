import { ReactNode } from "react";
import { Card, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  isLogin?: boolean;
}

const AuthLayout = ({ children, isLogin = true }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen items-stretch justify-center bg-gray-100 p-4 gap-4">
      {/* Right Panel */}
      <Card className=" md:w-1/2 flex flex-col justify-center p-8 shadow-md bg-white">
        {children}
      </Card>

      {/* Left Panel */}
      <Card className=" md:w-1/2 flex flex-col justify-between p-8 shadow-md bg-white">
        <Typography variant="h4" gutterBottom>
          ✨ “Thời trang không chỉ là quần áo – đó là tuyên ngôn của chính bạn.”
        </Typography>
        <Typography className="text-gray-700 mb-4">
          Chào mừng bạn đến với thế giới nơi cá tính được tỏa sáng, gu thẩm mỹ
          được tôn vinh và mỗi lựa chọn trang phục đều kể một câu chuyện riêng.{" "}
          <br />
          Dù bạn là người theo đuổi sự tối giản thanh lịch, cá tính nổi bật hay
          quyến rũ nhẹ nhàng – ở đây, chúng tôi không chỉ có sản phẩm, mà còn có
          nguồn cảm hứng. <br />
          👉 Hãy {isLogin ? "đăng nhập" : "đăng ký"} để bắt đầu hành trình làm
          mới bản thân. <br />
          👉 Chúng tôi không chỉ giúp bạn mặc đẹp. Chúng tôi giúp bạn trở thành
          chính mình – phiên bản thời thượng nhất.
        </Typography>
        <div className="mt-6">
          <Typography variant="body2">
            {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
          </Typography>
          <Button
            component={Link}
            to={isLogin ? "/register" : "/login"}
            variant="outlined"
            color="info"
            className="mt-2"
          >
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthLayout;
