export class Base64Converter {

  private base64textString:any = [];

  public toBase64(file: File) {

    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  private handleReaderLoaded(event: any) {
    return 'data:image/png;base64,' + btoa(event.target.result);
  }

}
