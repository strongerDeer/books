import SignForm from '@/components/organisms/SignForm';

export default function SignupTemplate() {
  return (
    <div>
      <h2 className="tac">회원가입</h2>
      <SignForm type="signup" />
    </div>
  );
}
