import { useState, useEffect, useRef } from 'react';
import './Portfolio.css';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const slides = [
    "안녕하세요! 꾸준히 성장하는 스마트팩토리 소프트웨어 개발자 홍현욱입니다.",
    "가장 좋아하는 취미는 기타 연주와 밴드 활동입니다.",
    "축구 관람하는 것, 직접 하는 것 둘 다 좋아합니다!"
  ];

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          const top = ref.current.getBoundingClientRect().top;
          if (top < window.innerHeight * 0.75) {
            ref.current.classList.add('fade-in-active');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} ${loaded ? 'fade-in' : ''}`}>
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">About Developer Jerry</div>
          <nav className="nav">
            <a onClick={() => scrollToSection('home')}>HOME</a>
            <a onClick={() => scrollToSection('about')}>ABOUT</a>
            <a onClick={() => scrollToSection('skills')}>SKILLS</a>
            <a onClick={() => scrollToSection('projects')}>PROJECTS</a>
            <a onClick={() => scrollToSection('contact')}>CONTACT</a>
          </nav>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="toggle-btn"
          >
            {darkMode ? '🌞' : '🌜'}
          </button>
        </div>
      </header>

      {/* Home Section with Slideshow */}
      <section id="home" ref={sectionRefs.home} className="home fade-in-section">
        <div className="slideshow-container">
          <div
            className="slide"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((text, index) => (
              <div key={index} className="slide-item">
                <h1>👋 {text}</h1>
              </div>
            ))}
          </div>
          <button className="prev-btn center-btn" onClick={prevSlide}>&#10094;</button>
          <button className="next-btn center-btn" onClick={nextSlide}>&#10095;</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className="section fade-in-section">
        <div className="card">
          <h2>💡 ABOUT ME</h2>
          <p>
            다양한 MES 시스템 개발 및 운영 경험을 보유하고 있습니다.<br/>
            C#.Net SpringBoot, React.js 등 다양한 프레임워크 개발 경험이 있으며,<br/>
            현재 프로젝트에서는 C#을 메인 언어로 활용하고 있습니다.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills} className="section fade-in-section">
        <h2>🚀 기술 스택</h2>
        <div className="skills-grid">
          {['Java', 'C#', 'SpringBoot', 'React.js', 'Oracle', 'MySQL', 'MS-SQL', 'nanoMMC', 'Highway101'].map(skill => (
            <div key={skill} className="skill-card">{skill}</div>
          ))}
        </div>
      </section>

      {/* Projects Section 복구 */}
      <section id="projects" ref={sectionRefs.projects} className="section fade-in-section">
        <h2>📂 프로젝트</h2>
        <div className="projects-grid">
          {[{
            title: '(주)엠아이큐브솔루션',
            period: '2024.08 ~ 재직중',
            details: ['개요: 삼성SDI EES 시스템 고도화 및 운영', 
                      '총 6개 법인의 APC 제어 및 레포트 개발 및 고도화',
                      '말레이, 천진 법인 EES 시스템 차세대 버전 서버 구축 업그레이드 진행',
                      '천안 원형 권취 공정 최적화를 위한 빗감김 신규 공정 실시간 제어 및 레포트 APC 화면 개발',
                      '천안 46파이 배터리 신규 모델 3개 공정 라인에 대한 실시간 제어 및 레포트 APC 화면 개발',
                      '톈진 파우치조립 테이핑 공정 최적화를 위한 설비 항목 누락 및 중복, 제어 값 PLC 미반영 시 감지 등 미제어 감지 신규 기능 설계 및 개발']
          }, {
            title: '삼양식품(주)',
            period: '2022.11 ~ 2024.08',
            details: ['개요: 밀양공장 MES 시스템 고도화 및 운영', 
                      'FMB 대시보드 구축 및 실시간 KPI 분석 개발',
                      '후레이크 스프 신규 설비 라인 구축 및 안정화 테스트 지원',
                      '블렌더/액상스프 신규 설비 구축 프로젝트 지원',
                      '설비 비가동 시간 화면 고도화 및 공장내 정례 비가동 시간 계산 기준 개선',
                      '주/야간 근무자 교대에 따른 일일 생산실적 집계 로직 고도화',
                      '상이한 제품 생산 실적에 대해 동일 BOM인 경우 생산 비율에 따른 자재 투입량 조정 마감 기능 및 화면 개발']
          }, {
            title: '(주)인포젠',
            period: '2018.11 ~ 2022.11',
            details: ['개요: LG디스플레이 MES 시스템 개발 및 운영', 
                      'P7 공장: MES/RMS 시스템간 통신 개선 개발 108개 Line 전개 적용',
                      'P8 공장: MES 설비 모니터링 잔여 재고 미표시 현상 개선 개발, 면취수 Max Capacity Up 개발 및 57개 Line 전개 적용, OLED 공정 재고 실처리 Data 보고 관련 신규 실처리 MSG 개발',
                      'P9 공장: MES 설비 모니터링 잔여 재고 미표시 현상 개선 개발, 신규 OLED 공정 MKT 설비군 통신 시나리오 개발 및 6개 Line 구축, 높이측정 설비 7개 Line 대상 실처리 Data Mix-up 현상 개선 및 사고방지, 공장 내 유기물 충진 프로세스 개선을 위한 통신 MSG 듀얼포맷 개발']
          }].map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title} ({project.period})</h3>
              <ul>
                {project.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" ref={sectionRefs.contact} className="footer fade-in-section">
        <div className="container">
          <h2>📞 연락처</h2>
          <p>✉️ 이메일: <span className="email">overbright@hanmail.net</span></p>
          <p>🌐 깃허브: <a href="https://github.com/Hyun-wook-Hong" className="github-link">링크</a></p>
          <p className="copyright">© 2025 홍현욱. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
