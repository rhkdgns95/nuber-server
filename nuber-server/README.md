# nuber-server

Server for the (N)Uber Clone

## Resolvers

### Ago Login - Public Resolvers:
<SignUp : 회원가입 / SignIn: 로그인>
- [X] Sign In / Sign Up with Facebook
: 페이스북 아이디 인증(아이디 존재하지 않는다면, photoProfile속성에 값넣은뒤, 생성)

- [X] Sign In with Email
: 이메일 로그인과 패스워드 인증(아이디존재할경우, 패스워드 검증을 통해서 확인)

- [X] Start Phone Number Verification
: 휴대폰으로 key생성하여 key값 + 메시지내용 전달, 즉 인증번호 생성후 SMS전송(Verification이 존재한다면, 제거 후 새로 생성함 => 제거를 하는이유: 이미 검증된것을 제거하기 위한것.)

- [X] Complete Phone Number Verification
: 1. 휴대폰번호와 키값을 입력받아서 Verification DB에 저장된 값이 있는지 확인한다. 
  (존재하는 경우, verified=true로 변경한뒤 DB에 저장시킨다)
  2. 검증된 폰번호가 존재하는 경우, User DB에서 값을 찾는다. 
  (존재하는 경우, verifiedPhoneNumber=true로 변경하고 DB값 저장시킨다. / 존재하지 않는경우, 인증은 되었으나 User테이블에 저장된 값이 없는경우 이므로, token,error는 null과 함께 true를 반환한다.)

- [X] Sign Up with Email
-----

### Authentication: 

- [X] Generate JWT
- [X] Verifiy JWT

### After Login - Private Resolvers:

- [X] Get My Profile
- [X] Request Email Verification
- [X] Complete Email Verification
- [X] Update My Profile
- [X] Toggle Driving Mode
- [X] Report location / orientation
- [X] Add Place
- [X] Edit Place
- [X] Delete Place
- [X] Get My Places
- [X] See Nearby Drivers
- [X] Subscribe to Nearby Drivers
- [X] Request a Ride

- [X] Get Nearby Ride Requests
- [X] Subscribe to Nearby Ride Requests
- [X] Update Ride Status
- [X] Get Ride
- [X] Subscribe to Ride Status
- [X] Create a Chat Room
- [X] Get Chat Room Messages
- [X] Send a Chat Messages
- [ ] Subscribe to Chat Room Messages

## Code Challenge

- [ ] Get Ride History
- [ ] See Ride Detail