import { useState, useEffect } from 'react'
import {
  Code,
  Cloud,
  Gamepad2,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Target,
  Eye,
  Upload,
  Play,
  Check,
  Send,
  Loader2,
  FileText,
  Clock,
  ThumbsUp,
  Brain,
  Terminal,
  Grid,
  CheckSquare,
  Smartphone,
  Compass,
  Globe,
  MapPin,
  Phone,
  Mail,
  TestTube,
  Trophy
} from 'lucide-react'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('interview')
  const [activeStep, setActiveStep] = useState(1)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  
  // Hero Live Visualizer State (rotates tabs automatically)
  const [visualizerTab, setVisualizerTab] = useState('interview')

  // AI Interview Prep Mock State
  const [codeSnippet, setCodeSnippet] = useState(
    `// Solve: Reverse a Singly Linked List\nfunction reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`
  )
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  // Cloud Storage Mock State
  const [files, setFiles] = useState([
    { name: 'Machine_Learning_Notes.pdf', size: '4.2 MB', date: '2 hours ago' },
    { name: 'Capstone_Project_Proposal.docx', size: '1.8 MB', date: 'Yesterday' },
    { name: 'Hackathon_Pitch_Presentation.pptx', size: '12.4 MB', date: '3 days ago' }
  ])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Gamified Learning Mock State
  const [xp, setXp] = useState(720)
  const [level, setLevel] = useState(3)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  const quizQuestions = [
    {
      question: "Which abstract data structure operates on a Last-In, First-Out (LIFO) model?",
      options: ['Queue', 'Stack', 'Tree', 'Graph'],
      answer: 'Stack'
    },
    {
      question: "What is the time complexity of searching in a balanced Binary Search Tree?",
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      answer: 'O(log n)'
    },
    {
      question: "Which of the following is an example of a NoSQL database?",
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
      answer: 'MongoDB'
    },
    {
      question: "In React, which hook is used to manage side effects?",
      options: ['useState', 'useContext', 'useEffect', 'useReducer'],
      answer: 'useEffect'
    },
    {
      question: "What does CSS stand for?",
      options: ['Computer Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets'],
      answer: 'Cascading Style Sheets'
    }
  ]

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto-switch visualizer tabs in Hero section every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setVisualizerTab((prev) => {
        if (prev === 'interview') return 'storage'
        if (prev === 'storage') return 'gaming'
        return 'interview'
      })
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  // Handle AI analysis triggers
  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setAnalysisComplete(false)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 2000)
  }

  // Handle file uploads triggers
  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
  }

  useEffect(() => {
    let interval
    if (isUploading) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            setFiles((prevFiles) => [
              { name: 'Algorithm_Design_Final.pdf', size: '2.5 MB', date: 'Just now' },
              ...prevFiles
            ])
            return 100
          }
          return prev + 20
        })
      }, 300)
    }
    return () => clearInterval(interval)
  }, [isUploading])

  // Handle Gamified Learning check triggers
  const handleAnswerClick = (ans) => {
    if (answerSubmitted) return
    setSelectedAnswer(ans)
  }

  const checkAnswer = () => {
    if (!selectedAnswer) return
    setAnswerSubmitted(true)
    const currentQuestion = quizQuestions[currentQuestionIndex]
    
    if (selectedAnswer === currentQuestion.answer) {
      setIsCorrect(true)
      setScore(prev => prev + 1)
      setXp((prev) => {
        const newXp = prev + 150
        if (newXp >= 1000) {
          setLevel((l) => l + 1)
          return newXp - 1000
        }
        return newXp
      })
    } else {
      setIsCorrect(false)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setAnswerSubmitted(false)
      setIsCorrect(null)
    } else {
      setQuizFinished(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setAnswerSubmitted(false)
    setIsCorrect(null)
    setScore(0)
    setQuizFinished(false)
  }

  // Handle Contact Submit
  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
    }, 1500)
  }

  // Stepper Details
  const stepDetails = {
    1: {
      title: 'Explore emerging paths',
      body: 'Our applied research begins by surveying new tech paradigms, reading academic breakthroughs, and understanding student bottlenecks.'
    },
    2: {
      title: 'Rapid Experimentation',
      body: 'We build early wireframes and light interactive concepts to test assumptions directly with a core group of student beta-testers.'
    },
    3: {
      title: 'Rigorous Validation',
      body: 'Through strict telemetry audits and user feedback metrics, we evaluate accessibility, loading response times, and cognitive load.'
    },
    4: {
      title: 'High Product Engineering',
      body: 'We transition validated prototypes into full codebases using clean APIs, structured modules, and strict deployment pipelines.'
    },
    5: {
      title: 'Global Scale & Launch',
      body: 'Products are released globally to the student ecosystem, supported by ongoing updates, user guides, and performance optimization.'
    }
  }

  return (
    <>
      {/* Dynamic Floating Pill Header / Navbar */}
      <div className="nav-wrapper">
        <header className="navbar">
          <div className="nav-container container">
            <a href="#" className="brand">
              <img src={heroImg} className="brand-logo" alt="TechVedha Gopuram Logo" />
              <span className="brand-name">TechVedha</span>
            </a>

            <nav className="desktop-menu">
              <a href="#about">About</a>
              <a href="#ecosystem">Ecosystem</a>
              <a href="#highlights">Highlights</a>
              <a href="#leadership">Leadership</a>
              <button onClick={() => setIsContactModalOpen(true)} className="btn-nav">Get in touch <ArrowRight className="nav-arrow" size={14} /></button>
            </nav>

            <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {isMenuOpen && (
            <div className="mobile-drawer">
              <nav className="mobile-menu">
                <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#ecosystem" onClick={() => setIsMenuOpen(false)}>Ecosystem</a>
                <a href="#highlights" onClick={() => setIsMenuOpen(false)}>Highlights</a>
                <a href="#leadership" onClick={() => setIsMenuOpen(false)}>Leadership</a>
                <button onClick={() => { setIsMenuOpen(false); setIsContactModalOpen(true); }} className="btn-nav">Get in touch <ArrowRight className="nav-arrow" size={14} /></button>
              </nav>
            </div>
          )}
        </header>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container grid-2">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot">●</span> TECHVEDHA ECOSYSTEM
            </div>
            <h1 className="hero-title">
              Where <span className="text-gradient">Imagination</span> <br />
              Meets Code.
            </h1>
            <p className="hero-subtitle">
              We design and build intelligent product suites engineered to accelerate mock learning, secure student files, and gamify complex concepts.
            </p>
            <div className="hero-actions">
              <a href="#ecosystem" className="btn btn-primary">
                Enter Student Hub <ArrowRight size={16} />
              </a>
              <button onClick={() => setIsContactModalOpen(true)} className="btn btn-secondary">
                Partner with Us
              </button>
            </div>
          </div>

          {/* Interactive Live Hub Visualizer */}
          <div className="hero-visual">
            <div className="visual-glowing-card">
              <div className="card-mesh"></div>
              
              <div className="visualizer-header">
                <span className="visualizer-status">Live Telemetry Preview</span>
              </div>

              <div className="visualizer-screens">
                {visualizerTab === 'interview' && (
                  <div className="vis-screen fade-in">
                    <Code className="vis-icon text-gold" size={32} />
                    <h4>AI Mock Evaluation</h4>
                    <span className="vis-value">96 / 100</span>
                    <p>JavaScript code compile match optimal: O(N) complexity verified.</p>
                  </div>
                )}
                {visualizerTab === 'storage' && (
                  <div className="vis-screen fade-in">
                    <Cloud className="vis-icon text-gold" size={32} />
                    <h4>Secure Student Cloud</h4>
                    <span className="vis-value">14.2 / 50 GB</span>
                    <div className="vis-bar-container">
                      <div className="vis-bar-fill" style={{ width: '28.4%' }}></div>
                    </div>
                    <p>Free student allocation active with academic domain signup.</p>
                  </div>
                )}
                {visualizerTab === 'gaming' && (
                  <div className="vis-screen fade-in">
                    <Gamepad2 className="vis-icon text-gold" size={32} />
                    <h4>Gamified Trivia Paths</h4>
                    <span className="vis-value">Level {level}</span>
                    <div className="vis-bar-container">
                      <div className="vis-bar-fill" style={{ width: `${(xp / 1000) * 100}%` }}></div>
                    </div>
                    <p>Earn XP badges by answering conceptual programming quizzes.</p>
                  </div>
                )}
              </div>

              {/* Mini Navigation Dots */}
              <div className="vis-dots">
                <span className={`vis-dot ${visualizerTab === 'interview' ? 'active' : ''}`} onClick={() => setVisualizerTab('interview')}></span>
                <span className={`vis-dot ${visualizerTab === 'storage' ? 'active' : ''}`} onClick={() => setVisualizerTab('storage')}></span>
                <span className={`vis-dot ${visualizerTab === 'gaming' ? 'active' : ''}`} onClick={() => setVisualizerTab('gaming')}></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Tags Section */}
      <section className="domain-section">
        <div className="container">
          <div className="tags-container">
            <span className="tag">AI Products</span>
            <span className="tag">Intelligent Applications</span>
            <span className="tag">Cloud Technologies</span>
            <span className="tag">Product Engineering</span>
            <span className="tag">Applied Research</span>
            <span className="tag">Gaming & Interactive Systems</span>
            <span className="tag">Digital Innovation</span>
            <span className="tag">Automation</span>
          </div>
        </div>
      </section>

      {/* Who We Are (Mission & Vision) */}
      <section className="who-we-are" id="about">
        <div className="container">
          <div className="section-header-left">
            <span className="section-tag">WHO WE ARE</span>
            <h2 className="section-title">A technology product company, by design</h2>
          </div>
          
          <div className="who-grid">
            <div className="description-col">
              <p className="paragraph-large">
                TechVedha is a technology product company focused on turning ambitious ideas into meaningful digital experiences. We combine product engineering, artificial intelligence, cloud technologies, applied research, and creative technology to design, build and evolve products for the real world.
              </p>
              <p className="paragraph-secondary">
                From intelligent applications to interactive experiences, we build technology with purpose — thoughtfully engineered, continuously refined and designed for what comes next.
              </p>
            </div>

            {/* Asymmetrical Capability Row Banner */}
            <div className="capabilities-row">
              <div className="capability-col">
                <span className="cap-label">Product</span>
                <p className="cap-text">Ideas transformed into usable technology.</p>
              </div>
              <div className="capability-col">
                <span className="cap-label">Intelligence</span>
                <p className="cap-text">AI and research applied to real products.</p>
              </div>
              <div className="capability-col">
                <span className="cap-label">Engineering</span>
                <p className="cap-text">Scalable, reliable and maintainable systems.</p>
              </div>
              <div className="capability-col">
                <span className="cap-label">Experience</span>
                <p className="cap-text">Interfaces and interactions designed around people.</p>
              </div>
            </div>

            {/* Asymmetrical Offset Mission & Vision Grid */}
            <div className="vision-cards-grid">
              {/* Mission Card */}
              <div className="card-mission offset-card-left">
                <div className="card-icon-circle">
                  <Target className="text-gold" size={24} />
                </div>
                <h3>Mission</h3>
                <p>
                  To engineer intelligent, accessible and purposeful technology that transforms ideas into products people can genuinely use.
                </p>
              </div>

              {/* Vision Card (High contrast dark card) */}
              <div className="card-vision-dark offset-card-right">
                <div className="card-icon-circle-dark">
                  <Eye className="text-gold" size={24} />
                </div>
                <h3>Vision</h3>
                <p>
                  To build a globally recognized technology product ecosystem where research, engineering and imagination come together to create what comes next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Obsidian Canvas (Dark Transition Hub Section for Wow Effect) */}
      <section className="ecosystem-section dark-canvas" id="ecosystem">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag dark-canvas-tag">STUDENT APP HUB</span>
            <h2 className="section-title dark-canvas-title">Engineered to Support Students</h2>
            <p className="section-subtitle dark-canvas-subtitle">
              We design specialized products tailored for modern student challenges. Click on the tabs below to interact with live dashboard mockups.
            </p>
          </div>

          {/* Interactive Navigation Tabs in Obsidian Theme */}
          <div className="tabs-nav dark-canvas-tabs">
            <button
              className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
              onClick={() => setActiveTab('interview')}
            >
              <Code size={18} />
              <span>AI Interview Prep</span>
            </button>
            
            <button
              className={`tab-btn ${activeTab === 'storage' ? 'active' : ''}`}
              onClick={() => setActiveTab('storage')}
            >
              <Cloud size={18} />
              <span>Secure Cloud Storage</span>
            </button>
            
            <button
              className={`tab-btn ${activeTab === 'gaming' ? 'active' : ''}`}
              onClick={() => setActiveTab('gaming')}
            >
              <Gamepad2 size={18} />
              <span>Gamified Learning</span>
            </button>
          </div>

          {/* Interactive Content Panels */}
          <div className="tab-window dark-canvas-window">
            {activeTab === 'interview' && (
              <div className="panel-grid">
                <div className="panel-info">
                  <h3>Practice with Instant Mock Evaluation</h3>
                  <p>
                    Prepare for technical roles using our intelligent code sandbox. Write algorithms in Python/JS and get instant feedback on time complexity, edge-case coverage, and code styling from our AI mentor.
                  </p>
                  <ul className="panel-list">
                    <li><CheckSquare size={16} className="text-gold" /> Practice mock coding & system design paths.</li>
                    <li><CheckSquare size={16} className="text-gold" /> Receive real-time cognitive code reviews.</li>
                    <li><CheckSquare size={16} className="text-gold" /> Study tailored resume-aligned questionnaires.</li>
                  </ul>
                  <button className="btn btn-primary" onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Analyzing Code...
                      </>
                    ) : (
                      <>
                        Run AI Analysis <Play size={16} />
                      </>
                    )}
                  </button>
                </div>

                <div className="panel-preview">
                  <div className="mock-code-editor">
                    <div className="editor-header">
                      <div className="editor-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                      </div>
                      <span className="editor-title">LinkedListReversal.js</span>
                      <Terminal size={14} className="text-gold" />
                    </div>
                    <div className="editor-body">
                      <textarea
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        rows={10}
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  {/* AI Feedback Output */}
                  <div className="mock-feedback-box dark-feedback">
                    <h4 className="feedback-title">AI Mentor Feedback</h4>
                    {isAnalyzing && (
                      <div className="feedback-loading">
                        <Loader2 className="animate-spin text-gold" size={24} />
                        <p>Processing code telemetry metrics...</p>
                      </div>
                    )}
                    {!isAnalyzing && !analysisComplete && (
                      <p className="feedback-placeholder text-gold-muted">
                        Modify the code snippet above and click "Run AI Analysis" to view performance metrics.
                      </p>
                    )}
                    {analysisComplete && (
                      <div className="feedback-results">
                        <div className="results-header dark-border">
                          <span className="score-label">Overall Match Score:</span>
                          <span className="score-val text-gold">96 / 100</span>
                        </div>
                        <div className="feedback-checks">
                          <div className="check-item text-green">
                            <CheckCircle2 size={16} /> <span>Time Complexity is optimal: O(N)</span>
                          </div>
                          <div className="check-item text-green">
                            <CheckCircle2 size={16} /> <span>Memory space allocated: O(1) auxiliary</span>
                          </div>
                          <div className="check-item text-green">
                            <CheckCircle2 size={16} /> <span>Variable declarations conform to ES6+ standards</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="panel-grid">
                <div className="panel-info">
                  <h3>Secure Student Storage & Hub</h3>
                  <p>
                    A protected cloud workspace dedicated to student researchers and builders. Store all thesis outlines, coding scripts, and group project files securely, with collaborative sharing controls built in.
                  </p>
                  <ul className="panel-list">
                    <li><CheckSquare size={16} className="text-gold" /> 50 GB free allocation with academic domain sign-up.</li>
                    <li><CheckSquare size={16} className="text-gold" /> Version control tracking for files.</li>
                    <li><CheckSquare size={16} className="text-gold" /> Integrated secure note markdown editor.</li>
                  </ul>
                  <button className="btn btn-primary" onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Uploading... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        Simulate File Upload <Upload size={16} />
                      </>
                    )}
                  </button>
                </div>

                <div className="panel-preview">
                  <div className="mock-storage-window dark-storage">
                    <div className="storage-header dark-border">
                      <div className="storage-title">My Drive / Academic_Docs</div>
                      <div className="storage-stats">
                        <span className="stats-indicator">14.2 GB used of 50 GB</span>
                        <div className="stats-bar"><div className="stats-fill" style={{ width: '28.4%' }}></div></div>
                      </div>
                    </div>

                    <div className="file-list">
                      {isUploading && (
                        <div className="file-row uploading dark-uploading">
                          <div className="file-icon"><Loader2 className="animate-spin text-gold" size={16} /></div>
                          <div className="file-details">
                            <span className="file-name text-muted">Algorithm_Design_Final.pdf</span>
                            <div className="upload-bar"><div className="upload-fill" style={{ width: `${uploadProgress}%` }}></div></div>
                          </div>
                        </div>
                      )}
                      
                      {files.map((file, idx) => (
                        <div className="file-row dark-row" key={idx}>
                          <div className="file-icon"><FileText size={16} className="text-gold" /></div>
                          <div className="file-details">
                            <span className="file-name">{file.name}</span>
                            <span className="file-meta">{file.size} • {file.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gaming' && (
              <div className="panel-grid">
                <div className="panel-info">
                  <h3>Gamified Conceptual Learning</h3>
                  <p>
                    Learn complex computing themes through interactive levels. Earn XP by answering algorithmic quizzes, competing in coding challenges, and ascending the global leaderboards.
                  </p>
                  <ul className="panel-list">
                    <li><CheckSquare size={16} className="text-gold" /> Custom paths for Algorithms, Web and Automation.</li>
                    <li><CheckSquare size={16} className="text-gold" /> Collect credentials and share verified badges.</li>
                    <li><CheckSquare size={16} className="text-gold" /> Team-based student developer tournaments.</li>
                  </ul>

                </div>

                <div className="panel-preview">
                  <div className="mock-quiz-box dark-quiz">
                    <div className="quiz-header">
                      <Brain size={18} className="text-gold" />
                      <span className="quiz-label">Tech Trivia ({currentQuestionIndex + 1}/{quizQuestions.length})</span>
                    </div>
                    
                    {!quizFinished ? (
                      <>
                        <p className="quiz-question">
                          {quizQuestions[currentQuestionIndex].question}
                        </p>

                        <div className="quiz-options">
                          {quizQuestions[currentQuestionIndex].options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleAnswerClick(opt)}
                              className={`option-btn dark-option ${selectedAnswer === opt ? 'selected' : ''} ${
                                answerSubmitted && opt === quizQuestions[currentQuestionIndex].answer ? 'correct' : ''
                              } ${
                                answerSubmitted && selectedAnswer === opt && opt !== quizQuestions[currentQuestionIndex].answer ? 'wrong' : ''
                              }`}
                              disabled={answerSubmitted}
                            >
                              <span>{opt}</span>
                              {answerSubmitted && opt === quizQuestions[currentQuestionIndex].answer && <CheckCircle2 size={16} className="text-green" />}
                              {answerSubmitted && selectedAnswer === opt && opt !== quizQuestions[currentQuestionIndex].answer && <X size={16} className="text-red" />}
                            </button>
                          ))}
                        </div>

                        <div className="quiz-actions">
                          {!answerSubmitted ? (
                            <button
                              className="btn btn-primary w-full"
                              onClick={checkAnswer}
                              disabled={!selectedAnswer}
                            >
                              Check Answer
                            </button>
                          ) : (
                            <div className="quiz-result-message">
                              {isCorrect ? (
                                <p className="result-text text-green" style={{ marginBottom: '0.75rem' }}>Correct!</p>
                              ) : (
                                <p className="result-text text-red" style={{ marginBottom: '0.75rem' }}>Incorrect. The correct answer was {quizQuestions[currentQuestionIndex].answer}.</p>
                              )}
                              <button className="btn btn-primary w-full" onClick={handleNextQuestion}>
                                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="quiz-final-results" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                          <Trophy size={48} className="text-gold trophy-bounce" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>Quiz Completed!</h3>
                        <p style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#e0e0e0' }}>Your Score: <span className="text-gold" style={{ fontWeight: 'bold' }}>{score} / {quizQuestions.length}</span></p>
                        <p style={{ marginBottom: '1.5rem', color: '#a0a0a0', lineHeight: '1.5' }}>
                          {score === 5 ? "Excellent work! You're a true tech master." :
                           score >= 3 ? "Good job! You have a solid understanding of these concepts." :
                           "Keep practicing! Reviewing these concepts will help you improve."}
                        </p>
                        <button className="btn btn-secondary w-full" onClick={resetQuiz}>
                          Restart Quiz
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modern Bento Grid Company Highlights Section */}
      <section className="principles-section" id="highlights">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">WHERE WE ARE</span>
            <h2 className="section-title">Company Highlights</h2>
            <p className="section-subtitle">The principles shaping how TechVedha researches, engineers and builds technology.</p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="bento-grid">
            {/* Card 1: Large Wide Card */}
            <div className="bento-card bento-wide">
              <div className="highlight-header">
                <div className="highlight-icon-circle">
                  <Smartphone className="text-gold" size={22} />
                </div>
                <span className="highlight-number">01</span>
              </div>
              <div className="bento-body">
                <h3>App Development Excellence</h3>
                <p>Engineering premium client native applications with responsive transitions, clean code guidelines, and beautiful cross-platform styling.</p>
              </div>
            </div>
            
            {/* Card 2: Regular Card */}
            <div className="bento-card">
              <div className="highlight-header">
                <div className="highlight-icon-circle">
                  <Layers className="text-gold" size={20} />
                </div>
                <span className="highlight-number">02</span>
              </div>
              <h3>Product-Based Engineering</h3>
            </div>

            {/* Card 3: Regular Card */}
            <div className="bento-card">
              <div className="highlight-header">
                <div className="highlight-icon-circle">
                  <Cpu className="text-gold" size={20} />
                </div>
                <span className="highlight-number">03</span>
              </div>
              <h3>AI & Cloud Innovation</h3>
            </div>

            {/* Card 4: Regular Card */}
            <div className="bento-card">
              <div className="highlight-header">
                <div className="highlight-icon-circle">
                  <TestTube className="text-gold" size={20} />
                </div>
                <span className="highlight-number">04</span>
              </div>
              <h3>Applied Research</h3>
            </div>

            {/* Card 5: Large Wide Card */}
            <div className="bento-card bento-wide">
              <div className="highlight-header">
                <div className="highlight-icon-circle">
                  <Gamepad2 className="text-gold" size={22} />
                </div>
                <span className="highlight-number">05</span>
              </div>
              <div className="bento-body">
                <h3>Gaming & Interactive Systems</h3>
                <p>Translating dry structural programming tasks into gamified student tournaments, interactive trivia modules, and XP level mechanics.</p>
              </div>
            </div>

            {/* Card 6: Regular Card */}
            <div className="bento-card">
              <div className="highlight-header">
                <div className="highlight-icon-circle">
                  <Grid className="text-gold" size={20} />
                </div>
                <span className="highlight-number">06</span>
              </div>
              <h3>Multiple Products Under Development</h3>
            </div>

            {/* Card 7: Regular Card */}
            <div className="bento-card">
              <div className="highlight-header">
                <div className="highlight-icon-circle">
                  <Globe className="text-gold" size={20} />
                </div>
                <span className="highlight-number">07</span>
              </div>
              <h3>Global Technology Vision</h3>
            </div>

            {/* Card 8: Regular Card */}
            <div className="bento-card">
              <div className="highlight-header">
                <div className="highlight-icon-circle">
                  <ShieldCheck className="text-gold" size={20} />
                </div>
                <span className="highlight-number">08</span>
              </div>
              <h3>Security & Engineering Standards</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership (Hands Behind TechVedha with Glowing Halos) */}
      <section className="leadership-section" id="leadership">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">LEADERSHIP</span>
            <h2 className="section-title">Hands Behind TechVedha</h2>
            <p className="section-subtitle">The people shaping TechVedha's vision, technology, products, research and growth.</p>
          </div>

          <div className="leadership-grid">
            {/* Card 1: Hitesh */}
            <div className="leader-card">
              <div className="leader-image-box">
                <div className="halo-glow"></div>
                <span className="leader-initials">HS</span>
              </div>
              <div className="leader-info">
                <h3>Mr. Hitesh Singh</h3>
                <span className="leader-title">Founder</span>
                <a href="#contact" className="leader-link">View profile →</a>
              </div>
            </div>

            {/* Card 2: Prashant */}
            <div className="leader-card">
              <div className="leader-image-box">
                <div className="halo-glow"></div>
                <span className="leader-initials">PK</span>
              </div>
              <div className="leader-info">
                <h3>Mr. Prashant R. Kaigaddi</h3>
                <span className="leader-subtext">Co-Founder & Director (R&D, QA & Academic Relations)</span>
                <span className="leader-title uppercase">Chief Executive Officer (CEO) - Chief Operating Officer (COO)</span>
                <a href="#contact" className="leader-link">View profile →</a>
              </div>
            </div>

            {/* Card 3: Yathiraj */}
            <div className="leader-card">
              <div className="leader-image-box">
                <div className="halo-glow"></div>
                <span className="leader-initials">YD</span>
              </div>
              <div className="leader-info">
                <h3>Mr. Yathiraj D. N.</h3>
                <span className="leader-subtext">Co-Founder, Creative Director & Head of Digital Media</span>
                <span className="leader-title uppercase">Chief Technology Officer (CTO)</span>
                <a href="#contact" className="leader-link">View profile →</a>
              </div>
            </div>

            {/* Card 4: Afnan */}
            <div className="leader-card">
              <div className="leader-image-box">
                <div className="halo-glow"></div>
                <span className="leader-initials">AK</span>
              </div>
              <div className="leader-info">
                <h3>Mr. Afnan Khan</h3>
                <span className="leader-subtext">Co-Founder & Director (Marketing, Finance & Business Development)</span>
                <span className="leader-title uppercase">Chief Executive Officer (CEO) · Chief Strategy Officer (CSO) · Chief Secretary</span>
                <a href="#contact" className="leader-link">View profile →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Philosophy Stepper */}
      <section className="research-section" id="research">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">RESEARCH PHILOSOPHY</span>
            <h2 className="section-title">Research With Purpose</h2>
            <p className="section-subtitle">
              At TechVedha, research is not isolated from product development. We explore emerging technologies, evaluate ideas through experimentation and translate discoveries into practical engineering.
            </p>
          </div>

          <div className="stepper-container">
            <div className="stepper-line">
              <div
                className="stepper-fill"
                style={{ width: `${((activeStep - 1) / 4) * 100}%` }}
              ></div>
            </div>
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                className={`step-node ${step <= activeStep ? 'active' : ''} ${step === activeStep ? 'current' : ''}`}
                onClick={() => setActiveStep(step)}
              >
                <span className="step-num">{step}</span>
              </button>
            ))}
          </div>

          <div className="step-display-card">
            <span className="step-display-header">STEP {activeStep}</span>
            <h3>{stepDetails[activeStep].title}</h3>
            <p>{stepDetails[activeStep].body}</p>
            <div className="step-nav-buttons">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(prev - 1, 1))}
                className="btn btn-secondary btn-sm"
              >
                Previous Step
              </button>
              <button
                disabled={activeStep === 5}
                onClick={() => setActiveStep((prev) => Math.min(prev + 1, 5))}
                className="btn btn-primary btn-sm"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Address & Live Map Iframe Embed) */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">CONTACT</span>
            <h2 className="contact-title">Let's Build Something <span className="text-gradient">Meaningful.</span></h2>
            <p className="section-subtitle font-serif">Tell us what you are planning. We will help engineer it into a product.</p>
          </div>

          <div className="contact-address-grid">
            {/* Address Box */}
            <div className="address-card">
              <h3>TechVedha LLP</h3>
              
              <div className="address-items">
                <div className="address-item">
                  <MapPin className="text-gold" size={20} />
                  <span>Mysuru, Karnataka, India</span>
                </div>
                
                <div className="address-item">
                  <Phone className="text-gold" size={20} />
                  <span>+91 8495996395</span>
                </div>

                <div className="address-item">
                  <Mail className="text-gold" size={20} />
                  <span>techvedha@techvedha.co.in</span>
                </div>
              </div>

              <button onClick={() => setIsContactModalOpen(true)} className="btn-write-us">
                Write to us &rarr;
              </button>
            </div>

            {/* Live Interactive Map focused on Mysuru */}
            <div className="map-card">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124884.81640822606!2d76.55938166567382!3d12.310636270919106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf70381d572ec7%3A0xf1588c42b2eab13b!2sMysuru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                width="100%" 
                height="320" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Floating Modal Contact Form */}
      {isContactModalOpen && (
        <div className="modal-overlay" onClick={() => setIsContactModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsContactModalOpen(false)}>
              <X size={20} />
            </button>

            {formSubmitted ? (
              <div className="form-success-message">
                <div className="success-icon-wrapper">
                  <CheckCircle2 size={40} className="text-gold" />
                </div>
                <h3>Message Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. We have logged your request and our coordinators will contact you shortly at <strong>{formData.email}</strong>.
                </p>
                <button className="btn btn-secondary" onClick={() => {
                  setFormSubmitted(false);
                  setIsContactModalOpen(false);
                }}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <h3 className="modal-title font-serif">Write to TechVedha</h3>
                <p className="modal-subtitle">Submit details and we'll contact you in 24 business hours.</p>

                <div className="form-group">
                  <label htmlFor="modal-name">Your Name</label>
                  <input
                    type="text"
                    id="modal-name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-email">Email Address</label>
                  <input
                    type="email"
                    id="modal-email"
                    required
                    placeholder="name@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modal-role">I am a</label>
                  <select
                    id="modal-role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="Student">Student</option>
                    <option value="Educator / Researcher">Educator / Researcher</option>
                    <option value="Partner Company">Partner Company</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="modal-message">Message</label>
                  <textarea
                    id="modal-message"
                    required
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Delivering Message...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#" className="brand">
              <img src={heroImg} className="brand-logo" alt="TechVedha Gopuram Logo" />
              <span className="brand-name">TechVedha</span>
            </a>
            <p className="footer-tagline">
              Engineering technology product suites to support research and empower student developers.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-col">
              <h4>Ecosystem</h4>
              <a href="#ecosystem">AI Interview Prep</a>
              <a href="#ecosystem">Secure Cloud Storage</a>
              <a href="#ecosystem">Gamified Learning</a>
            </div>
            
            <div className="footer-links-col">
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#highlights">Highlights</a>
              <a href="#leadership">Leadership Team</a>
            </div>

            <div className="footer-links-col">
              <h4>Resources</h4>
              <a href="#">Student Guide</a>
              <a href="#">System Status</a>
              <a href="#contact">Support Desk</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} TechVedha. All rights reserved. | You Plan. We Execute.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
