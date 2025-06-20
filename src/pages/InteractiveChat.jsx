import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Plus,
  Brain,
  Paperclip,
  Image,
  Mic,
  ChevronDown,
  ChevronRight,
  User,
  Bot,
  Stethoscope,
  Heart,
  Activity,
  FileText,
  Search,
  Clock,
  Star,
  AlertCircle,
  X,
  Upload
} from 'lucide-react';

const MedicalChat = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'assistant',
      content: 'Welcome to Cura AI Assistant! I\'m here to help you with medical diagnoses, treatment suggestions, and patient care guidance. How can I assist you today?',
      timestamp: new Date(),
      nested: [],
      isHtml: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [error, setError] = useState(null);

  // Image upload state
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const promptCategories = [
    {
      icon: FileText,
      title: 'Diagnosis',
      description: 'Get AI-powered diagnostic suggestions based on symptoms and patient history.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Heart,
      title: 'Treatment Plans',
      description: 'Receive comprehensive treatment recommendations and medication guidance.',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      icon: Activity,
      title: 'Patient Monitoring',
      description: 'Track patient progress, vital signs analysis, and recovery monitoring.',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Stethoscope,
      title: 'Medical Research',
      description: 'Access latest medical research, drug interactions, and clinical guidelines.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const sampleQuestions = [
    "What are the differential diagnoses for chest pain in a 45-year-old male?",
    "Explain the treatment protocol for Type 2 diabetes management",
    "What are the contraindications for prescribing ACE inhibitors?",
    "How to interpret elevated troponin levels in cardiac patients?"
  ];

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // Image upload functions
  const handleImageUpload = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isImage && isValidSize;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: e.target.result,
          uploadedAt: new Date()
        };

        setUploadedImages(prev => [...prev, imageData]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Function to sanitize HTML content (basic sanitization)
  const sanitizeHtml = (html) => {
    // Allow basic HTML tags but remove potentially dangerous ones
    const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code'];

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove script tags and other dangerous elements
    const scripts = tempDiv.querySelectorAll('script, iframe, object, embed, link, meta, style');
    scripts.forEach(script => script.remove());

    return tempDiv.innerHTML;
  };

  // Function to call the medical AI API
  const callMedicalAPI = async (prompt, images = []) => {
    try {
      const formData = new FormData();
      formData.append('prompt', prompt);

      // Add images to form data
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image.file);
      });

      const response = await fetch('http://localhost:3000/api/ai/medical', {
        method: 'POST',
        body: formData // Using FormData for file uploads
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Function to parse HTML content and extract sections
  const parseHTMLContent = (htmlString) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // Extract sections based on HTML structure
    const sections = [];

    // Get all list items (contraindications)
    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach((li, index) => {
      const strongElement = li.querySelector('strong');
      const title = strongElement ? strongElement.textContent.trim().replace(':', '') : `Point ${index + 1}`;
      const content = li.innerHTML.trim(); // Use innerHTML to preserve formatting

      if (content && title) {
        sections.push({
          id: `section-${Date.now()}-${index}`,
          question: `What about ${title}?`,
          answer: content,
          expanded: false,
          category: title.includes('Pregnancy') ? 'Critical' :
                   title.includes('Angioedema') ? 'Critical' :
                   title.includes('Stenosis') ? 'Caution' :
                   title.includes('Hypotension') ? 'Caution' :
                   title.includes('Allergy') ? 'Critical' : 'General',
          confidence: 0.95,
          isHtml: true
        });
      }
    });

    // If no list items found, try to extract paragraphs
    if (sections.length === 0) {
      const paragraphs = tempDiv.querySelectorAll('p');
      paragraphs.forEach((p, index) => {
        const content = p.innerHTML.trim(); // Use innerHTML to preserve formatting
        if (content && content.length > 50) { // Only meaningful paragraphs
          sections.push({
            id: `para-${Date.now()}-${index}`,
            question: `Key Point ${index + 1}`,
            answer: content,
            expanded: false,
            category: 'Information',
            confidence: 0.9,
            isHtml: true
          });
        }
      });
    }

    return { sections };
  };

  // Function to parse API response and generate nested Q&A
  const parseResponseToNestedQA = (apiResponse) => {
    // Handle structured JSON response with nestedQA
    if (apiResponse.nestedQA && Array.isArray(apiResponse.nestedQA)) {
      return apiResponse.nestedQA.map((qa, index) => ({
        id: `qa-${Date.now()}-${index}`,
        question: qa.question || `Question ${index + 1}`,
        answer: qa.answer || 'No answer provided',
        expanded: false,
        category: qa.category || 'General',
        confidence: qa.confidence || 0.8,
        isHtml: typeof qa.answer === 'string' && qa.answer.includes('<')
      }));
    }

    // Handle HTML response
    const content = apiResponse.content || apiResponse.response || apiResponse;
    if (typeof content === 'string' && content.includes('<')) {
      const { sections } = parseHTMLContent(content);
      return sections;
    }

    // Handle plain text response
    if (typeof content === 'string') {
      const sections = content.split('\n\n').filter(section => section.trim());

      return sections.slice(0, 5).map((section, index) => {
        const lines = section.split('\n');
        const question = lines[0] || `Key Point ${index + 1}`;
        const answer = lines.slice(1).join(' ') || section;

        return {
          id: `qa-${Date.now()}-${index}`,
          question: question.replace(/^[#*\-\d\.]\s*/, ''),
          answer: answer,
          expanded: false,
          category: index === 0 ? 'Summary' : `Point ${index + 1}`,
          confidence: 0.85,
          isHtml: false
        };
      });
    }

    return [];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && uploadedImages.length === 0) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue || 'Image analysis request',
      timestamp: new Date(),
      isHtml: false,
      images: [...uploadedImages] // Include images in the message
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    const currentImages = [...uploadedImages];

    setInputValue('');
    setCharacterCount(0);
    setUploadedImages([]); // Clear uploaded images after sending
    setIsTyping(true);
    setError(null);

    try {
      // Call the medical AI API with images
      const apiResponse = await callMedicalAPI(currentInput, currentImages);

      // Extract the main response content
      let mainContent;
      let isHtmlContent = false;
      const responseContent = apiResponse.response || apiResponse.content || apiResponse.message || apiResponse;

      // Handle HTML content
      if (typeof responseContent === 'string' && responseContent.includes('<')) {
        mainContent = sanitizeHtml(responseContent);
        isHtmlContent = true;
      } else {
        mainContent = typeof responseContent === 'string' ? responseContent : 'I received your query and am processing the medical information.';
        isHtmlContent = false;
      }

      // Generate nested Q&A from the API response
      const nestedQA = parseResponseToNestedQA(apiResponse);

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: mainContent,
        timestamp: new Date(),
        nested: nestedQA,
        isHtml: isHtmlContent
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error calling medical API:', error);

      // Handle API errors gracefully
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I apologize, but I'm having trouble connecting to the medical AI service right now. Please check your connection and try again. Error: ${error.message}`,
        timestamp: new Date(),
        nested: [],
        isError: true,
        isHtml: false
      };

      setMessages(prev => [...prev, errorMessage]);
      setError(error.message);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleNestedQA = (messageId, qaId) => {
    setMessages(prev => prev.map(message => {
      if (message.id === messageId && message.nested) {
        return {
          ...message,
          nested: message.nested.map(qa =>
            qa.id === qaId ? { ...qa, expanded: !qa.expanded } : qa
          )
        };
      }
      return message;
    }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10000) {
      setInputValue(value);
      setCharacterCount(value.length);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Symptoms': 'bg-blue-100 text-blue-800',
      'Diagnostics': 'bg-green-100 text-green-800',
      'Treatment': 'bg-purple-100 text-purple-800',
      'Risk Factors': 'bg-orange-100 text-orange-800',
      'Referral': 'bg-red-100 text-red-800',
      'Summary': 'bg-indigo-100 text-indigo-800',
      'General': 'bg-gray-100 text-gray-800',
      'Critical': 'bg-red-100 text-red-800',
      'Caution': 'bg-yellow-100 text-yellow-800',
      'Information': 'bg-blue-100 text-blue-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: 'Welcome to Cura AI Assistant! I\'m here to help you with medical diagnoses, treatment suggestions, and patient care guidance. How can I assist you today?',
        timestamp: new Date(),
        nested: [],
        isHtml: false
      }
    ]);
    setUploadedImages([]);
    setError(null);
  };

  // Component to render content (HTML or plain text)
  const ContentRenderer = ({ content, isHtml }) => {
    if (isHtml) {
      return (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            // Override prose styles to match our design
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-lead': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-counters': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-hr': 'inherit',
            '--tw-prose-quotes': 'inherit',
            '--tw-prose-quote-borders': 'inherit',
            '--tw-prose-captions': 'inherit',
            '--tw-prose-code': 'inherit',
            '--tw-prose-pre-code': 'inherit',
            '--tw-prose-pre-bg': 'inherit',
            '--tw-prose-th-borders': 'inherit',
            '--tw-prose-td-borders': 'inherit',
          }}
        />
      );
    }
    return <span className="text-sm leading-relaxed">{content}</span>;
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      // Handle non-image file upload logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cura AI Assistant</h1>
            <p className="text-gray-600 mt-1">Your intelligent medical consultation companion</p>
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">Connection Error: {error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        <div className="">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 1 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="64" height="64" rx="12" fill="#E0F7F9"/>
                        <path d="M20 24H44C45.1046 24 46 24.8954 46 26V44C46 45.1046 45.1046 46 44 46H20C18.8954 46 18 45.1046 18 44V26C18 24.8954 18.8954 24 20 24Z" stroke="#057C8B" stroke-width="2"/>
                        <path d="M26 20C26 17.7909 27.7909 16 30 16H34C36.2091 16 38 17.7909 38 20V24H26V20Z" stroke="#057C8B" stroke-width="2"/>
                        <path d="M32 30V40" stroke="#057C8B" stroke-width="2" stroke-linecap="round"/>
                        <path d="M27 35H37" stroke="#057C8B" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="16" cy="16" r="3" fill="#057C8B"/>
                        <path d="M12 12L10 10" stroke="#057C8B" stroke-width="2" stroke-linecap="round"/>
                        <path d="M20 12L22 10" stroke="#057C8B" stroke-width="2" stroke-linecap="round"/>
                        <path d="M16 8V5" stroke="#057C8B" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Ask me anything—I'm here to help!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Get instant medical insights, diagnostic support, and treatment recommendations
                    </p>

                    <div className="space-y-2 max-w-md mx-auto">
                      {sampleQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(question)}
                          className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-start space-x-3">
                        {message.type === 'assistant' && (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.isError ? 'bg-red-600' : 'bg-[var(--color-primary)]'
                          }`}>
                            {message.isError ? (
                              <AlertCircle className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                        )}

                        <div className="flex-1">
                          <div className={`p-4 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-[var(--color-primary)] text-white'
                              : message.isError
                              ? 'bg-red-50 text-red-900 border border-red-200'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <ContentRenderer content={message.content} isHtml={message.isHtml} />

                            {/* Display images in user messages */}
                            {message.images && message.images.length > 0 && (
                              <div className="mt-3 grid grid-cols-2 gap-2">
                                {message.images.map((image) => (
                                  <div key={image.id} className="relative">
                                    <img
                                      src={image.dataUrl}
                                      alt={image.name}
                                      className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                      {image.name}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.type === 'assistant' && message.nested && message.nested.length > 0 && (
                              <span className="text-xs text-[var(--color-primary)] font-medium">
                                {message.nested.length} related insights
                              </span>
                            )}
                          </div>

                          {/* Nested Q&A */}
                          {message.type === 'assistant' && message.nested && message.nested.length > 0 && (
                            <div className="mt-4 space-y-3">
                              <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                                <Search className="w-4 h-4 mr-2" />
                                Related Medical Insights
                              </h4>
                              {message.nested?.slice(1,3).map((qa) => (
                                <div key={qa.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                  <button
                                    onClick={() => toggleNestedQA(message.id, qa.id)}
                                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                                  >
                                    <div className="flex items-center space-x-3 flex-1">
                                      {qa.expanded ? (
                                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                      )}
                                      <span className="text-sm font-medium text-gray-900">{qa.question}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(qa.category)}`}>
                                        {qa.category}
                                      </span>
                                      <div className="flex items-center space-x-1">
                                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                        <span className="text-xs text-gray-600">{(qa.confidence * 100).toFixed(0)}%</span>
                                      </div>
                                    </div>
                                  </button>

                                  {qa.expanded && (
                                    <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                                      <div className="pt-4">
                                        <div className="text-sm text-gray-700 leading-relaxed">
                                          <ContentRenderer content={qa.answer} isHtml={qa.isHtml} />
                                        </div>
                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            <span>Generated just now</span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <span className="text-xs text-gray-500">Confidence:</span>
                                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                              <div
                                                className="h-full bg-green-500 rounded-full transition-all duration-300"
                                                style={{ width: `${qa.confidence * 100}%` }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 p-4 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200">
                {/* Image Upload Preview */}
                {uploadedImages.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Image className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Uploaded Images ({uploadedImages.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uploadedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.dataUrl}
                            alt={image.name}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removeImage(image.id)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                            {image.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drag and Drop Area */}
                <div
                  className={`relative ${isDragOver ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about symptoms, treatments, diagnoses, or any medical question..."
                    className="w-full p-4 pr-20 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    disabled={isTyping}
                  />
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{characterCount}/10,000</span>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-8 h-8 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Brain className="w-4 h-4" />
                      <span className="text-sm">Core Think</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <button onClick={handleButtonClick} className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm">Attach File</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Mic className="w-4 h-4" />
                      <span className="text-sm">Voice Message</span>
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {isTyping ? 'AI is thinking...' : 'Press Enter to send, Shift+Enter for new line'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalChat;
