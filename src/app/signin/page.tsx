import SignForm from '@/components/organisms/SignForm';

export default function SignupTemplate() {
  return (
    <div>
      <h2 className="tac">로그인</h2>
      <SignForm type="signin" />
    </div>
  );
}
