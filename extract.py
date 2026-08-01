import traceback
try:
    try:
        from pypdf import PdfReader
    except ImportError:
        import subprocess
        subprocess.check_call(['python', '-m', 'pip', 'install', 'pypdf'])
        from pypdf import PdfReader
        
    reader = PdfReader(r'c:\Users\Dell\Desktop\Portfolio\assets\niruta_cv.pdf')
    with open('cv_text.txt', 'w', encoding='utf-8') as f:
        for p in reader.pages:
            t = p.extract_text()
            if t:
                f.write(t + '\n')
    print("Done writing to cv_text.txt")
except Exception as e:
    print("Exception occurred:")
    traceback.print_exc()
