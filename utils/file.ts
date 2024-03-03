export function fileToURL(file: File) {
  if (file) {
    return URL.createObjectURL(file);
  }
}

export function forceDownloadFromURL(url: string, filename: string) {
  // This is the old way of doing it, but it doesn't work in Safari

  // Query Builder

  const a = document.createElement("a");

  a.href = url + "&download=1";
  a.download = filename;
  a.click();

  a.remove();

  // fetch(url)
  //   .then((response) => response.blob())
  //   .then((blob) => {
  //     const a = document.createElement("a");
  //     a.style.display = "none";
  //     const blobUrl = window.URL.createObjectURL(blob);
  //     a.href = blobUrl;
  //     a.download = filename;

  //     document.body.appendChild(a);
  //     a.click();

  //     window.URL.revokeObjectURL(blobUrl);

  //     document.body.removeChild(a);
  //   })
  //   .catch((error) => {
  //     console.error("Error downloading file:", error);
  //   });
}

export function isImage(file: File) {
  if (file) {
    return /^image\//.test(file.type);
  }
}

export function formatSize(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }

  let k = 1000,
    dm = 0,
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function fileName(file: File) {
  if (file) {
    return file.name;
  }
}
