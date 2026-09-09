---
class: divider brand-cc-solid
---

<p class="div-no">4-B</p>

## 검증한 앱 배포

<p class="div-sub">Vercel과 Cloud Run · 내 PC 밖에서 실행하기</p>
<p class="div-file">강사 시연 · 공개 가능한 샘플 데이터</p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-B · 배포 선택</p>

# 어디에 배포할까

<p class="lead">화면만 필요한가, 서버에서 처리할 일이 있는가?</p>

| 만들 앱 | 시작할 후보 | 먼저 확인할 것 |
|---|---|---|
| 브라우저 안에서 엑셀 분석 | Vercel | 파일이 서버로 전송되는지 |
| 웹 화면과 짧은 API 처리 | Vercel | 지원 런타임·실행 시간·환경 변수 |
| Python·Node 서버, 컨테이너 | Cloud Run | 실행 명령·PORT·인증·저장소 |

<p class="thesis">같은 앱도 구조에 따라 배포 방식이 달라집니다. 오늘은 강사가 공개 가능한 샘플 앱으로 두 경로를 보여줍니다.</p>
<p class="src">공식 안내 · <a href="https://vercel.com/docs/deployments">Vercel deployments</a> · <a href="https://docs.cloud.google.com/run/docs/deploying-source-code">Cloud Run source deployment</a></p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">4-B · Vercel</p>

# Vercel에 올리기

<div class="steps">
<div><b>저장소 준비</b><span>동작을 확인한 앱을 GitHub 저장소에 커밋·푸시</span></div>
<div><b>가져오기</b><span>Vercel 로그인 → Add New → Project → 저장소 Import</span></div>
<div><b>설정 확인</b><span>앱 폴더·프레임워크·빌드 명령·출력 폴더·환경 변수 확인</span></div>
<div><b>배포·검증</b><span>Deploy 후 발급 주소에서 샘플 업로드와 필터 동작 재확인</span></div>
</div>
<p class="thesis">첫 프로젝트 배포도 Production이 될 수 있습니다. 실행 전 대상과 공개 범위를 확인합니다. 업무용은 회사가 승인한 플랜 사용.</p>
<p class="src">공식 안내 · <a href="https://vercel.com/docs/deployments">Git 저장소에서 배포</a> · <a href="https://vercel.com/docs/plans/hobby">Hobby는 개인·비상업 용도</a></p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-B · Vercel</p>

# Vercel 배포 요청

<p class="lead">Claude에게 앱 구조를 확인시킨 뒤 배포 설정 작성</p>

```text
이 앱을 Vercel에 배포할 수 있는지 확인해줘.
앱 루트, 프레임워크, 빌드 명령, 출력 폴더를 정리해줘.
필요한 환경 변수는 이름과 용도만 알려줘. 비밀 값은 코드에 넣지 마.
로컬 빌드가 통과하면 배포할 프로젝트와 공개 범위를 보여줘.
배포 후에는 발급된 주소에서 정상 파일 업로드,
전체 2%와 A라인 4%, 필수 열 누락 안내를 다시 확인해줘.
```
<p class="thesis">CLI를 쓸 때 · <code>npx.cmd vercel</code>. 연결할 계정·프로젝트와 배포 환경을 확인하고 진행합니다.</p>
<p class="src">공식 안내 · <a href="https://vercel.com/docs/cli/deploy">vercel deploy</a> · 첫 배포 이후 <code>--prod</code>는 Production 배포</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">4-B · Cloud Run</p>

# Cloud Run 준비

<p class="lead">소스 코드를 빌드해 서버로 실행</p>
<figure class="figure"><svg viewBox="0 0 900 140" role="img" aria-label="소스 코드가 Cloud Build를 거쳐 Artifact Registry의 컨테이너 이미지로 저장되고 Cloud Run의 HTTPS 서비스로 배포된다">
<g style="font-family:var(--sans);font-size:21px" fill="var(--ink)" text-anchor="middle"><text x="90" y="55">소스 코드</text><text x="320" y="55">Cloud Build</text><text x="550" y="55">이미지 저장</text><text x="795" y="55">Cloud Run</text></g>
<g fill="var(--dim)" style="font-family:var(--sans);font-size:15px" text-anchor="middle"><text x="90" y="95">내 프로젝트</text><text x="320" y="95">빌드</text><text x="550" y="95">Artifact Registry</text><text x="795" y="95">HTTPS 주소</text></g>
<g fill="var(--accent)" style="font-size:25px"><text x="190" y="57">→</text><text x="430" y="57">→</text><text x="665" y="57">→</text></g></svg></figure>
<div class="deflist">
<div><b>프로젝트</b><span>결제 계정 연결 · Cloud Run, Cloud Build, Artifact Registry API 활성화</span></div>
<div><b>권한</b><span>배포 계정과 빌드 서비스 계정의 IAM 권한 확인</span></div>
<div><b>앱</b><span>실행 명령과 의존성 명시. <code>0.0.0.0</code>에서 <code>PORT</code> 환경 변수 사용</span></div>
</div>
<p class="src">공식 안내 · <a href="https://docs.cloud.google.com/run/docs/deploying-source-code">Source deployment와 필요한 역할</a> · <a href="https://docs.cloud.google.com/run/docs/container-contract">Container contract</a></p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">4-B · Cloud Run</p>

# Cloud Run에 올리기

<p class="lead">Windows PowerShell · Google Cloud CLI 설치 후 앱 폴더에서 실행</p>

```powershell
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud run deploy seah-lab --source . --region asia-northeast3
```
<div class="deflist">
<div><b>YOUR_PROJECT_ID</b><span>수업용 GCP 프로젝트 ID로 교체. 프로젝트 이름과 구분</span></div>
<div><b>인증 선택</b><span>기본 인증 정책 확인. 공개 샘플 시연일 때만 비인증 접근 허용</span></div>
<div><b>완료 확인</b><span>출력된 서비스 URL에서 샘플 실행. 실패하면 빌드 로그와 서비스 로그 확인</span></div>
</div>
<p class="src">공식 안내 · <a href="https://docs.cloud.google.com/sdk/docs/install">Google Cloud CLI 설치</a> · <a href="https://docs.cloud.google.com/run/docs/deploying-source-code">gcloud run deploy --source</a></p>
<!-- 준비된 프로젝트와 권한이 없으면 강사 시연만 진행. 공개 시연은 비민감 샘플만 사용하며 필요 시 --allow-unauthenticated를 설명한다. 조직 정책에 따라 허용되지 않을 수 있다. -->

---
class: top-led brand-cc
---

<p class="eyebrow">4-B · 배포 확인</p>

# 배포 주소에서도 재검증

<p class="lead">로컬에서 통과한 같은 샘플, 같은 사용자 동작</p>

| 확인 | 볼 것 |
|---|---|
| 새 브라우저에서 접속 | 로그인 필요 여부, 링크를 받는 사람의 접근 권한 |
| 정상 샘플 업로드 | 전체 2%, A라인 4% |
| 누락 열·새로고침 | 오류 안내, 데이터 보존 여부 |
| 운영 설정 | 비밀 값 분리, 비용 확인, 사용 후 테스트 서비스 정리 |

<p class="thesis">Cloud Run의 로컬 파일은 영구 저장소가 아닙니다. 저장이 필요하면 Cloud Storage나 DB를 별도로 연결합니다.</p>
<p class="src">공식 안내 · <a href="https://docs.cloud.google.com/run/docs/container-contract#file-system">Cloud Run 파일 시스템</a> · <a href="https://vercel.com/docs/environment-variables">Vercel 환경 변수</a></p>
